import os
import jwt
# from jwt import JWT
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import HTTPException, status
import traceback
load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

def get_token(data: any):
    payload = {
        "data" : data,
        "iat"  : datetime.now(timezone.utc),
        "exp"  : datetime.now(timezone.utc) + timedelta(minutes=15)
    }
    
    # print({
    #     "iat"  : datetime.now(timezone.utc).ctime(),
    #     "exp"  : (datetime.now(timezone.utc) + timedelta(minutes=15)).ctime()
    # })
    
    # print(payload)
    # JWT_SECRET = "HS256"
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    # print(f"Token from get_token: {token}")
    return token


def decode_token(token):
    try:
        # print(JWT_SECRET_KEY)
        # print(JWT_ALGORITHM)
        decoded_payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        # print(f"Token from decode_token: {decoded_payload}")

        return decoded_payload
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        raise HTTPException(detail="Token has expired", status_code=status.HTTP_401_UNAUTHORIZED)
        # return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        raise HTTPException(detail="Invalid Token", status_code=status.HTTP_401_UNAUTHORIZED)
        # return None





# def generate_access_token(payload: dict):

#     try:
#         data = payload.copy()
#         data["type"] = "access"
#         instance = JWT()
                
#     except Exception as e:
#         tb  = traceback.extract_tb(e.__traceback__)
#         error = f"Line : {tb[-1].lineno} file: {tb[-1].filename}"
#         print("Error: ", str(e), error)

# def generate_refresh_token():
#     pass
