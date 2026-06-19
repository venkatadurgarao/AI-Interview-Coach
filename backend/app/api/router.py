from fastapi import APIRouter, FastAPI, Request, HTTPException, status, Response, Depends
from fastapi.responses import RedirectResponse, JSONResponse
from app.models.PydanticSchema import Login as LoginSchema, Register as RegisterSchema, JWT_Type as JWT_TypeSchema
import bcrypt
import sqlite3
from app.utils.jwt_helpers import get_token, verify_token
from app.utils.sqlite_cursor import get_cursor

from app.api.route_handlers.auth import login, register
from app.api.route_handlers.private import dashboard
from starlette.middleware.base import BaseHTTPMiddleware
router = APIRouter()
auth_routes = APIRouter(prefix="/auth")

@router.get("/index/")
def index_page():
    return {
        "message" : "Welcome to index page"
    }
    
# @router.post("/auth/login")


auth_routes.add_api_route(
    path="/login",
    endpoint=login,
    methods=["POST"]
)

auth_routes.add_api_route(
    path="/register",
    endpoint=register,
    methods=["POST"]
)

async def jwt_middleware(req: Request):
    token = req.headers.get("Authorization")
    if not token:
        raise HTTPException(detail="Token missing", status_code=status.HTTP_401_UNAUTHORIZED)
    
    token = token.split(" ")[1]
    token_decode = verify_token(token)
    # if 
    req.app.state.decoded_token = token_decode
    return token_decode

# router.middleware_stack()
router.add_api_route(
    path="/dashboard",
    endpoint=dashboard,
    methods=["POST"],
    dependencies=[Depends(jwt_middleware)]
)


# @router.post("/auth/register", status_code=status.HTTP_201_CREATED)