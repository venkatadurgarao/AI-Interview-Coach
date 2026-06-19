I used following Tech-Stack:
    Backend:
        Python
        FastAPI
        Gemini
        Sentence Transformers / Gemini Embeddings
        ChromaDB
        SQLite
    Frontend:
        React
        Typescript
        TailwindCSS
    Database:
        SQLite
    Vector Store:
        ChromaDB
    





from contextlib import asynccontextmanager
from fastapi import FastAPI

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing ChromaDB...")
    print("Initializing SQLite...")
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)