from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey, Text, TIMESTAMP, String, func
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from datetime import datetime


class InterviewEvaluation(Base):
    __tablename__ = "interview_evaluations"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    chat_id: Mapped[int] = mapped_column(
        ForeignKey("interview_chats.id"),
        nullable=False,
        unique=True
    )

    score: Mapped[int] = mapped_column(
        nullable=False
    )

    technical_accuracy: Mapped[int] = mapped_column(
        nullable=False
    )

    completeness: Mapped[int] = mapped_column(
        nullable=False
    )

    relevance: Mapped[int] = mapped_column(
        nullable=False
    )

    answer_quality: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    strengths: Mapped[list[str]] = mapped_column(
        JSONB,
        nullable=False
    )

    weaknesses: Mapped[list[str]] = mapped_column(
        JSONB,
        nullable=False
    )

    missing_concepts: Mapped[list[str]] = mapped_column(
        JSONB,
        nullable=False
    )

    improved_answer: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    follow_up_required: Mapped[bool] = mapped_column(
        nullable=False
    )

    follow_up_reason: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    next_action: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )