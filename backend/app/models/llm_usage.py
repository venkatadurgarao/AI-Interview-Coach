from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, TIMESTAMP, func
from app.database import Base
from datetime import datetime

class LLMUsage(Base):
    __tablename__ = "llm_usage"

    id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True)
    model: Mapped[str] = mapped_column(String(100), nullable=False)
    reference_name: Mapped[str] = mapped_column(String(100), nullable=False)
    reference_id: Mapped[str] = mapped_column(String(255), nullable=False)
    prompt_tokens: Mapped[int] = mapped_column(default=0, nullable=False)
    completion_tokens: Mapped[int] = mapped_column(default=0, nullable=False)
    total_tokens: Mapped[int] = mapped_column(default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())