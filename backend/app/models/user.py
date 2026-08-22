from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, TIMESTAMP, func
from datetime import datetime

class User(Base):
    
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    user_fname: Mapped[str] = mapped_column(String(100))
    user_lname: Mapped[str] = mapped_column(String(100))
    user_pass: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

