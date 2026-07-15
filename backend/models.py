from pydantic import BaseModel, EmailStr, Field

# Model for User Sign Up
class UserCreate(BaseModel):
    fullname: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)

# Model for User Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Model for answering questions
class ChatRequest(BaseModel):
    question: str
    detailLevel: str = "detailed"
    creativity: float = 0.3

# Model for User Response (what we send back to frontend)
class UserResponse(BaseModel):
    id: str
    fullname: str
    email: str

# Model for generating a quiz
class QuizRequest(BaseModel):
    topic: str
    difficulty: str = "intermediate"
    length: int = 8
    format: str = "mixed"