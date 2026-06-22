import os
import jwt
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from fastapi import HTTPException, status

load_dotenv()

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

def get_token(data: any):
    payload = {
        "data" : data,
        "iat"  : datetime.now(timezone.utc),
        "exp"  : datetime.now(timezone.utc) + timedelta(minutes=2)
    }
    
    print({
        "iat"  : datetime.now(timezone.utc).ctime(),
        "exp"  : (datetime.now(timezone.utc) + timedelta(minutes=15)).ctime()
    })
    
    # print(payload)
    # JWT_SECRET = "HS256"
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    print(f"Token from get_token: {token}")
    return token


def decode_token(token):
    try:
        print(JWT_SECRET_KEY)
        print(JWT_ALGORITHM)
        decoded_payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        print(f"Token from decode_token: {decoded_payload}")

        return decoded_payload
    except jwt.ExpiredSignatureError:
        print("Token has expired")
        raise HTTPException(detail="Token has expired", status_code=status.HTTP_401_UNAUTHORIZED)
        # return None
    except jwt.InvalidTokenError:
        print("Invalid token")
        raise HTTPException(detail="Invalid Token", status_code=status.HTTP_401_UNAUTHORIZED)
        # return None
