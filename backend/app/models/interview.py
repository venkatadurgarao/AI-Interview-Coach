from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, TIMESTAMP, func, ForeignKey
from app.database import Base
from datetime import datetime
import uuid
from enum import Enum

class StatusTypes(str, Enum):
    ACTIVE = "active"
    PENDING = "pending"
    COMPLETED = "completed"


class Interview(Base):
    __tablename__ = "interviews"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    role: Mapped[str] = mapped_column(String(50), nullable=False)
    technology: Mapped[str] = mapped_column(String(50), nullable=False)
    experience: Mapped[str] = mapped_column(String(50), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(50), nullable=False)
    duration: Mapped[str] = mapped_column(String(50), nullable=False)
    question_type: Mapped[str] = mapped_column(String(50), nullable=False)
    estimated_questions: Mapped[int] = mapped_column(default=0)
    status: Mapped[StatusTypes] = mapped_column(String(50), nullable=False)
    user_email: Mapped[str] = mapped_column(
        ForeignKey("users.user_email"),
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        server_onupdate=func.now(),
    )
