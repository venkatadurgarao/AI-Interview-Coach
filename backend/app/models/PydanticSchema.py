from pydantic import BaseModel


class Login(BaseModel):
    user_email: str
    user_pass: str


class Register(BaseModel):
    user_fname: str
    user_lname: str
    user_email: str
    user_pass: str
    
class JWT_Type(BaseModel):
    user_email: str
    user_fname: str
    user_lname: str