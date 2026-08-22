from fastapi import FastAPI, Request, status, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from app.api.router import router, auth_routes
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
import sqlite3
from app.api.routes.auth import auth
from app.api.routes.interview import interview_routes
from app.utils.jwt_helpers import decode_token
import traceback

from app.core.ws import websocket_router
# from contextlib import asynccontextmanager
""" 
├── Create FastAPI app
├── Configure CORS
├── Load SQLite
├── Load ChromaDB
├── Register API routers
├── Startup / Shutdown hooks
└── Health endpoints

"""


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     con = sqlite3.connect("sqlite.db", check_same_thread=False)
#     users_table_create = """
#     CREATE TABLE IF NOT EXISTS users (
#         id INTEGER PRIMARY KEY,
#         user_email VARCHAR(255) UNIQUE,
#         user_fname VARCHAR(50) NOT NULL,
#         user_lname VARCHAR(50) NOT NULL,
#         user_pass TEXT NOT NULL,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     );
#     """
#     cursor = con.cursor()
#     result = cursor.execute(users_table_create)
#     print(f"Effected Rows : {result.rowcount}")
    
    
    
#     # con.cursor().execute()
#     app.state.con = con
#     print("DB Connected")
    
#     yield
    
#     con.close()
#     print("DB Disconnected")
    
    

# Create FastAPI app
app = FastAPI(
    # lifespan=lifespan,
    title="AI Interviwe Coach",
    version="1.0.0",
    # lifespan=lifespan
)

@app.get("/")
def check_health():
    return {
        "status": "running"
    }

@app.middleware("http")
async def auth_middleware(req: Request, call_next):
    try:
        
        print("Path ", req.url.path)
        if req.url.path.startswith("/auth"):
            return await call_next(req)
        
        token = req.cookies.get('jwt_token')
        if not token:
            return JSONResponse(
                content={"message" : "Invalid Credentials"},
                status_code=status.HTTP_401_UNAUTHORIZED
            )
        
        payload = decode_token(token)

        req.state.user = payload['data']
        return await call_next(req)
    except HTTPException as e:
        return JSONResponse(
            content={"message" : "Invalid Credentials"},
            status_code=e.status_code            
        )
    except Exception as e:
        return JSONResponse(
            content={"message" : "Something went wrong"},
            status_code=500
        )
        


# CORSMiddleware(
#     app=app,
#     allow_origins=["http://localhost:5173"],
#     allow_methods=["GET", "POST"],
#     allow_credentials=False,
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# HTTPSRedirectMiddleware(
#     app=app,
    
# )

# app.add_middleware
try:
    
    app.include_router(router)
    app.include_router(auth_routes)
    app.include_router(auth)
    app.include_router(interview_routes)
except Exception as e:
    print("Error: ", str(e))
    tb = traceback.extract_tb(e.__traceback__)
    print(f"Error Info: {tb[-1].filename} line {tb[-1].lineno}")
# app.include_router([router, auth_routes])

app.include_router(websocket_router)


