import os
import json
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma

# --- FIX: The Standard Import ---
# This is the correct path. If VS Code shows a yellow line, ignore it for now.
# It will work when the server runs.
from langchain.chains.question_answering import load_qa_chain

from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

# --- 1. PDF Processing ---
def get_pdf_text(pdf_file):
    text = ""
    pdf_reader = PdfReader(pdf_file)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    # CHANGE 1: Update model name here
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
    
    vector_store = Chroma.from_texts(text_chunks, embedding=embeddings, persist_directory="chroma_db")
    return vector_store

# --- 2. Chat Logic (The RAG Part) ---
def get_conversational_chain(detail_level="detailed", temperature=0.3):

    detail_instructions = {
        "simple": "Explain the concepts very simply, like I am 5 years old. Use analogies and avoid overly dense jargon.",
        "balanced": "Provide a clear, balanced explanation suitable for an undergraduate student.",
        "detailed": "Provide a highly detailed, academic, and rigorous response. Use professional astrophysics terminology."
    }
    
    current_detail_instruction = detail_instructions.get(detail_level, detail_instructions["detailed"])

    prompt_template = f"""
    You are an expert Astrophysics Research Assistant (AstroGPT). 
    Your goal is to answer the user's question accurately.

    Instruction for Detail Level: {current_detail_instruction}

    Here is the context extracted from the user's uploaded research paper:
    <document_context>
    {{context}}
    </document_context>

    RULES FOR ANSWERING:
    1. Primary Source: Always prioritize the <document_context> to answer the question.
    2. External Knowledge: If the document context is incomplete, you MAY use your broader factual knowledge (internet/training data) to supplement the answer and fill in the gaps.
    3. Fact-Checking: Only include external information if it is a widely accepted scientific fact. Do NOT invent or hallucinate data.
    4. Transparency: If you are pulling in information that is NOT in the provided document, clearly state that you are supplementing with general scientific knowledge.
    
    Question: {{question}}

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=temperature)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    
    # Load the chain using the standard function
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def get_answer_from_pdf(user_question, detail_level="detailed", creativity=0.3):
    # CHANGE 2: Update model name here too
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
    
    new_db = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
    
    docs = new_db.similarity_search(user_question)
    
    chain = get_conversational_chain(detail_level=detail_level, temperature=creativity)
    
    response = chain.invoke({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    
    return response["output_text"]

# --- 3. Quiz Generation Logic ---
def generate_quiz_data(topic: str, difficulty: str = "intermediate", length: int = 8, format: str = "mixed"):
    # Part A: Try to find info about this topic in the uploaded PDF
    context = ""
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
        # Connect to the database where the PDF is memorized
        db = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
        # Search for the top 3 most relevant chunks of text
        docs = db.similarity_search(topic, k=3)
        # Combine them into one big string
        for doc in docs:
            context += doc.page_content + "\n"
    except Exception as e:
        print("No PDF uploaded yet or database empty. Using Gemini's general knowledge.")

    # Part B: Give Gemini extremely strict rules for its output

    format_instruction = "Provide a mix of True/False (TF) and Multiple Choice Questions (MCQ)."
    if format == "mcq":
        format_instruction = "Provide ONLY Multiple Choice Questions (MCQ)."
    elif format == "tf":
        format_instruction = "Provide ONLY True/False (TF) questions."

    prompt_template = f"""
    You are an expert Astrophysics tutor. Your goal is to generate a quiz with exactly {length} questions based on the topic: '{topic}'.
    
    The difficulty level of these questions must be: {difficulty.upper()}. 
    Adjust the complexity of the concepts and the vocabulary accordingly.
    
    If the following document context is provided and relevant, use it to create the questions:
    <document_context>
    {{context}}
    </document_context>

    RULES:
    1. {format_instruction}
    2. You MUST return ONLY a valid JSON array. 
    3. Do not include markdown formatting, no ```json tags, and no conversational text. Just the raw JSON brackets.
    
    FORMAT EXACTLY LIKE THIS:
    [
      {{
        "type": "TF",
        "text": "A black hole's gravity is so strong that light cannot escape.",
        "correctAnswer": "True"
      }},
      {{
        "type": "MCQ",
        "text": "Which of these is the closest star to Earth?",
        "options": ["Sirius", "Alpha Centauri", "The Sun", "Betelgeuse"],
        "correctAnswer": "The Sun"
      }}
    ]
    """
    
    # Part C: Send the prompt to Gemini
    # We use a slightly higher temperature (0.7) so the questions are creative and varied
    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.7)
    
    response = model.invoke(prompt_template)
    raw_text = response.content

    # Part D: Clean up the response just in case Gemini adds markdown tags
    raw_text = raw_text.replace('```json', '').replace('```', '').strip()

    # Part E: Convert the text string into a real Python List/Dictionary
    try:
        quiz_json = json.loads(raw_text)
        return quiz_json
    except json.JSONDecodeError:
        raise Exception("Failed to parse the AI response into usable JSON format.")