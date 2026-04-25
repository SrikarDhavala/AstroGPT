import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

# Create the MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

# Connect to the database named "astro_gpt"
db = client.astro_gpt

# Export collections for easy access in other files
users_collection = db.get_collection("users")
chats_collection = db.get_collection("chats")