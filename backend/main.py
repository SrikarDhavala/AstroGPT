from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import shutil
import os
from dotenv import load_dotenv

load_dotenv()

# Import our custom modules
from database import db, users_collection
from models import UserCreate, UserResponse, UserLogin, ChatRequest, QuizRequest
from auth import get_password_hash, verify_password
from pdf_service import get_pdf_text, get_text_chunks, get_vector_store, get_answer_from_pdf, generate_quiz_data

# --- Startup Event ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        # Check Mongo Connection
        await db.command("ping")
        print("✅ SUCCESS: Connected to MongoDB!")
    except Exception as e:
        print(f"❌ ERROR: MongoDB connection failed: {e}")
    yield

app = FastAPI(lifespan=lifespan)

# --- CORS (Allow Frontend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routes ---

@app.get("/")
def read_root():
    return {"message": "Astro-GPT Backend is Active"}

# 1. Sign Up
@app.post("/signup", response_model=UserResponse)
async def create_user(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    user_dict = {
        "fullname": user.fullname,
        "email": user.email,
        "password": hashed_password
    }
    
    new_user = await users_collection.insert_one(user_dict)
    return {
        "id": str(new_user.inserted_id),
        "fullname": user.fullname,
        "email": user.email
    }

# 2. Login
@app.post("/login")
async def login(user: UserLogin):
    existing_user = await users_collection.find_one({"email": user.email})
    if not existing_user or not verify_password(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"message": "Login successful", "user": user.email}

# 3. Upload PDF
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Save temp file
        temp_filename = f"temp_{file.filename}"
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Process PDF
        with open(temp_filename, "rb") as f:
             raw_text = get_pdf_text(f)
        
        text_chunks = get_text_chunks(raw_text)
        get_vector_store(text_chunks)
        
        # Cleanup
        os.remove(temp_filename)
        
        return {"message": "PDF processed and memorized!"}

    except Exception as e:
        return {"error": str(e)}

# 4. Chat with PDF
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = get_answer_from_pdf(request.question, detail_level=request.detailLevel, creativity=request.creativity)
        return {"answer": response}
    except Exception as e:
        return {"error": str(e)}

# 5. Generate Quiz
@app.post("/generate-quiz")
async def generate_quiz(request: QuizRequest):
    try:
        # Call the function we built in pdf_service.py
        quiz_data = generate_quiz_data(request.topic, request.difficulty, request.length, request.format)
        
        # Send the JSON array back to the React frontend
        return {"questions": quiz_data}
    except Exception as e:
        return {"error": str(e)}