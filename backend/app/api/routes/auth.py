from fastapi import  APIRouter, Request, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.schema.PydanticSchema import LoginSchema, JWT_Type, RegisterSchema
from app.database import get_db
from app.models.user import User
import bcrypt
import jwt
from app.utils.jwt_helpers import get_token, decode_token
import traceback
auth = APIRouter(
    prefix='/auth',
    tags=["Authentication"]
    # dependencies=
)

# ======================== /login ===============================
@auth.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    
    try:
        user_info = db.query(User).filter(User.user_email == data.user_email).first()
        print(user_info)
        
        if not user_info or not user_info.user_email:
            raise HTTPException(detail="User not found", status_code=status.HTTP_401_UNAUTHORIZED)
        
        # print("DB Pass", user_info.user_pass)
        # print("DB Pass Type", type(user_info.user_pass))
        # print("User Pass", data.user_pass)
        # print("User Pass Type", type(data.user_pass))
        compare = bcrypt.checkpw(data.user_pass.encode('utf-8'), user_info.user_pass.encode('utf-8'))
        # compare = bcrypt.checkpw(hashed_password=user_info.user_pass, password=data.user_pass.encode('utf-8'))
        # compare = bcrypt.checkpw(data.user_pass.encode("utf-8"), user_info.user_pass)
        # compare = bcrypt.checkpw(data.user_pass.encode('utf-8'), user_info.user_pass)


        
        if not compare:
            raise HTTPException(detail="Invalid Credentials", status_code=status.HTTP_401_UNAUTHORIZED)
        
        payload: JWT_Type = {
            "user_email" : user_info.user_email,
            "user_fname" : user_info.user_fname,
            "user_lname" : user_info.user_lname
        }
        
        token = get_token(payload)
        
        response = JSONResponse(
            content={"message": "Login successfull", "login" : "success"},
            status_code=status.HTTP_200_OK
        )
        
        response.set_cookie(
            key="jwt_token",
            value=token,
            max_age=1800,
            samesite='lax',
            httponly=True,
            # secure=False,
            # path="/"
        )        
        return response
        
    except HTTPException as e:
        print(f"Error: {str(e)}")
        return JSONResponse(
                    content={"message": "Failed to login", "error":str(e), "login" : "failed"},
                    status_code=e.status_code
                )
    except Exception as e:
        print(f"Error: {str(e)}")
        tb = traceback.extract_tb(e.__traceback__)
        print(tb[-1].lineno)
        print(tb[-1].filename)
        return JSONResponse(
            content={"message": "Failed to login", "error":str(e), "login" : "failed"},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    # except

# ======================== /register ===============================
@auth.post("/register")
def register(data:RegisterSchema, db:Session = Depends(get_db)):
    try:
        if data.user_pass != data.confirm_pass:
            raise HTTPException(detail="Passwords should be same", status_code=status.HTTP_406_NOT_ACCEPTABLE)
        

        hashed_password = bcrypt.hashpw(data.user_pass.encode('utf-8'), bcrypt.gensalt()).decode("utf-8")
        # print("Hashed Password: ", hashed_password)
        # print("Hashed Password: ", type(hashed_password))
        user_instance = User(
            user_email=data.user_email,
            user_fname=data.user_fname,
            user_lname=data.user_lname,
            user_pass=hashed_password
        )
        # print(user_instance)
        db.add(user_instance)   
        db.commit()

        return JSONResponse(
            content={"message": "Registered Successfully"},
            status_code=status.HTTP_200_OK,
        )

        # db.add()
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(
            content={"message": "Registration Failed", "error": str(e)},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    

# ======================== /verify-token ===============================
@auth.get('/verify-token')
def verify_token(req: Request):
    try:
        jwt_token = req.cookies.get("jwt_token")

        if not jwt_token:
            print("=============== No Token ===============")
            return JSONResponse(
                content={"message" : "Token not found"},
                status_code=status.HTTP_401_UNAUTHORIZED
            )
        
        decoded_token:JWT_Type = decode_token(jwt_token)
        # print(decoded_token.get('data').get('user_email'))
        
            
        return JSONResponse(
            content={"message" : "Token Valid", "user_email" : decoded_token.get('data').get('user_email')},
            status_code=200
        )
    except Exception as e:
        print("=============== Token Expired ===============")
        print("Invalid Token", str(e))
        
        return JSONResponse(
            content={"message" : "Invalid Token", "error": str(e)},
            status_code=status.HTTP_401_UNAUTHORIZED
        )
