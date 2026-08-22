import os

from dotenv import load_dotenv

load_dotenv()

LLM_MODEL = os.getenv("LLM")
DATABASE_URL = os.getenv("NEON_DB_URL")

REDIS_URL=os.getenv("REDIS_URL")

