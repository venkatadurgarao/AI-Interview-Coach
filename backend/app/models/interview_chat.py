from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, String, Text, TIMESTAMP, func
import uuid 
from datetime import datetime
from enum import Enum

class ResponedBy(str, Enum):
    USER = "user"
    AI = "ai"

# class ResponseStatus(str, Enum):
    

class InterviewChat(Base):
    __tablename__ = "interview_chats"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    interview_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("interviews.id"), nullable=False)
    topic_id: Mapped[int] = mapped_column(ForeignKey("interview_topics.id"), nullable=False)
    response : Mapped[str] = mapped_column(Text, nullable=False)
    responded_by: Mapped[ResponedBy] = mapped_column(nullable=False) # user | ai
    response_status: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())