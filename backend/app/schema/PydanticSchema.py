from enum import Enum
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Any
from datetime import datetime
from uuid import UUID
from app.models.interview_chat import ResponedBy
from typing import Literal


class LoginSchema(BaseModel):
    user_email: str
    user_pass: str = Field(min_length=8)


class RegisterSchema(BaseModel):
    user_fname: str = Field(min_length=1)
    user_lname: str = Field(min_length=1)
    user_email: str
    user_pass: str = Field(min_length=8)
    confirm_pass: str = Field(min_length=8)
    
class JWT_Type(BaseModel):
    user_email: str
    user_fname: str
    user_lname: str
    




class InterviewResponse(BaseModel):
    id: UUID
    role: str
    technology: str
    experience: str
    difficulty: str
    duration: str
    question_type: str
    status: str
    user_email: str
    created_at: datetime
    updated_at: datetime
    # model_config = ConfigDict(from_attributes=True)

class InterviewListResponse(BaseModel):
    rows_count: int
    message: str
    interviews: list[InterviewResponse]
    
class InterviewSingleResponse(BaseModel):
    success: bool
    message: str
    interview_info: InterviewResponse
    error: str
    # error: any

class ChatType(BaseModel):
    id: int
    interview_id: UUID
    topic_id: int
    response: str
    responded_by: ResponedBy
    response_status: str
    created_at: datetime
    updated_at: datetime
    # """ creating chat type schema for chat response in interview start useeffect """

class InterviewChatType(BaseModel):
    success: bool
    message: str
    chat: list[ChatType]



# class InterviewQuestionRequest(BaseModel):
#     interview_id: str

class InterviewQuestionResponse(BaseModel):
    success: bool
    message: str
    chatMessage: ChatType | None

class SubmitInterviewQuestion(BaseModel):
    answer: str
    topic_id: int

class LLMUsageType(BaseModel):
    prompt_tokens : int
    completion_tokens: int
    total_tokens: int


    
    
    
# ==================== INTERVIEW ==================== 
class InterviewSetupType(BaseModel):
    role: str
    technology: str
    experience: str
    difficulty: str
    duration: str
    question_type: str
    
    
class LLMResponse (BaseModel):
    text: Any
    usage : LLMUsageType
    
class TopicType(BaseModel):
    order: int
    topic: str
    difficulty: str
    
class LLMResponse_TopicGenerateType(BaseModel):
    estimated_questions: int
    topics: list[TopicType]
    
class AnswerQuality(str, Enum):
    excellent = "excellent"
    good = "good"
    average = "average"
    weak = "weak"
    poor = "poor"


class NextAction(str, Enum):
    follow_up = "follow_up"
    next_topic = "next_topic"


class AnswerEvaluation(BaseModel):
    score: int
    technical_accuracy: int
    completeness: int
    relevance: int
    answer_quality: AnswerQuality
    strengths: list[str]
    weaknesses: list[str]
    missing_concepts: list[str]
    improved_answer: str
    follow_up_required: bool
    follow_up_reason: str
    next_action: NextAction
    question: str
    topic: str
    question_type: str



class InterviewEvaluationResponse(BaseModel):
    score: int
    technical_accuracy: int
    completeness: int
    relevance: int

    answer_quality: Literal[
        "excellent",
        "good",
        "average",
        "weak",
        "poor"
    ]

    strengths: list[str]
    weaknesses: list[str]
    missing_concepts: list[str]

    improved_answer: str

    follow_up_required: bool
    follow_up_reason: str

    next_action: Literal[
        "follow_up",
        "next_topic"
    ]

    question: str
    topic: str
    question_type: str
# ==================== INTERVIEW ==================== 


# ==================== LLM ==================== 
class LLMQuestionType (BaseModel):
    question: str
    topic: str
# ==================== LLM ==================== 
    
# 