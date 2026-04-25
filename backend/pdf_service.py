import os
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
def get_conversational_chain():
    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details. 
    If the answer is not in the provided context, just say, "answer is not available in the context", don't provide the wrong answer.

    Context:
    {context}

    Question: 
    {question}

    Answer:
    """
    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    
    # Load the chain using the standard function
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def get_answer_from_pdf(user_question):
    # CHANGE 2: Update model name here too
    embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001")
    
    new_db = Chroma(persist_directory="chroma_db", embedding_function=embeddings)
    
    docs = new_db.similarity_search(user_question)
    
    chain = get_conversational_chain()
    
    response = chain.invoke({"input_documents": docs, "question": user_question}, return_only_outputs=True)
    
    return response["output_text"]