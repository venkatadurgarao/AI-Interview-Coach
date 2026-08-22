from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, String, TIMESTAMP, func
from app.database import Base
import uuid 
from datetime import datetime
class InterviewTopics(Base):
    __tablename__ = "interview_topics"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    interview_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("interviews.id"), nullable=False)
    order: Mapped[int] = mapped_column(nullable=False)
    topic: Mapped[str] = mapped_column(String(100), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(100), nullable=False)
    
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True), 
        server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now()
    )