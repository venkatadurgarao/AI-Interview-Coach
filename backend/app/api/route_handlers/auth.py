from fastapi import APIRouter, FastAPI, Request, HTTPException, status, Response
from fastapi.responses import RedirectResponse, JSONResponse
from app.models.PydanticSchema import Login as LoginSchema, Register as RegisterSchema, JWT_Type as JWT_TypeSchema
import bcrypt
import sqlite3
from app.utils.jwt_helpers import get_token, verify_token
from app.utils.sqlite_cursor import get_cursor

def login(data: LoginSchema, request: Request):

    try:
        # con:sqlite3.Connection = request.app.state.con
        # con.row_factory = sqlite3.Row
        # cursor = con.cursor()
        db_connection = get_cursor(req=request)
        
        if not db_connection:
            raise HTTPException(detail="Connection not created", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        con, cursor = db_connection
        print(data.user_email)
        
        user_info = cursor.execute("SELECT * FROM users WHERE user_email = ?", (data.user_email,)).fetchone()
        
        if not user_info:
            raise HTTPException(detail="Invalid Credentials", status_code=status.HTTP_401_UNAUTHORIZED)
        
        print(user_info)
        
        compare = bcrypt.checkpw(data.user_pass.encode("utf-8"), user_info['user_pass'])
        if not compare:
            raise HTTPException(detail="Invalid Credentials", status_code=status.HTTP_401_UNAUTHORIZED)
        
        cookie_info:JWT_TypeSchema = {
            "user_email" : user_info["user_email"],
            "user_fname" : user_info["user_fname"],
            "user_lname" : user_info["user_lname"]
        }
        
        token = get_token(cookie_info)
        
        response = JSONResponse(
            status_code=status.HTTP_200_OK,
            content={ "message" : "Login Successful", "login" : "success" }
        )
        
        response.set_cookie(
            key="jwt_token",
            value=token,
            secure=True,
            samesite="lax",
            max_age=900,
            httponly=True
        )
        
        return response
    
        # return {"message" : "Login Successfully"}
        # print({"compare":compare, "entered":data.user_pass, "hash":user_info['user_pass']})

    except Exception as e:
        print(f"Error: \n{e}")
        # return 
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={"message" : "Invalid Credentials", "error": str(e), "login": "failed"},
        )
        # raise HTTPException(detail="Invalid Credentials", status_code=status.HTTP_401_UNAUTHORIZED)
        
        
def register(data: RegisterSchema, request: Request):
    try:
        con:sqlite3.Connection = request.app.state.con
        cursor = con.cursor()
        
        user = cursor.execute("SELECT 1 FROM users WHERE user_email = ?", (data.user_email,)).fetchone()
        
        if user:
            raise HTTPException(detail="User Already exist.", status_code=409)
        
        insert = """
            INSERT INTO users (user_fname, user_lname, user_email, user_pass) VALUES (?,?,?,?)
        """
        
        hashed_pass = bcrypt.hashpw(data.user_pass.encode(), bcrypt.gensalt())
        
        cursor.execute(insert, (data.user_fname, data.user_lname, data.user_email, hashed_pass))
        con.commit()
        
        if not cursor.lastrowid:
            raise HTTPException(detail="Failed to insert", status_code=500)
        
        return {"message" : "Registered Successfully"}
    except Exception as e:
        print(f"Error : \n{e}")
        return {"message" : "Failed to process your request", "error": str(e)}