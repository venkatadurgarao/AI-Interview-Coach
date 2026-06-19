from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from app.api.router import router, auth_routes
import sqlite3
from contextlib import asynccontextmanager
""" 
├── Create FastAPI app
├── Configure CORS
├── Load SQLite
├── Load ChromaDB
├── Register API routers
├── Startup / Shutdown hooks
└── Health endpoints

"""


@asynccontextmanager
async def lifespan(app: FastAPI):
    con = sqlite3.connect("sqlite.db", check_same_thread=False)
    users_table_create = """
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        user_email VARCHAR(255) UNIQUE,
        user_fname VARCHAR(50) NOT NULL,
        user_lname VARCHAR(50) NOT NULL,
        user_pass TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    cursor = con.cursor()
    result = cursor.execute(users_table_create)
    print(f"Effected Rows : {result.rowcount}")
    
    
    
    # con.cursor().execute()
    app.state.con = con
    print("DB Connected")
    
    yield
    
    con.close()
    print("DB Disconnected")
    
    

# Create FastAPI app
app = FastAPI(
    lifespan=lifespan,
    title="AI Interviwe Coach",
    version="1.0.0",
    # lifespan=lifespan
)

@app.get("/")
def check_health():
    return {
        "status": "running"
    }


CORSMiddleware(
    app=app,
    allow_origins=("http://localhost:5173"),
    allow_methods=("GET", "POST"),
    allow_credentials=False,
)


# HTTPSRedirectMiddleware(
#     app=app,
    
# )

# app.add_middleware
app.include_router(router)
app.include_router(auth_routes)
# app.include_router([router, auth_routes])