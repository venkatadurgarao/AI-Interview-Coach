from fastapi import APIRouter, Depends, status, Request, HTTPException
import traceback
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import update, select, func
from app.database import get_db
from app.schema.PydanticSchema import InterviewSetupType
from app.models.interview import Interview
from app.models.interview_chat import InterviewChat, ResponedBy
from app.models.llm_usage import LLMUsage
from app.models.interview_topics import InterviewTopics
from app.schema.PydanticSchema import InterviewListResponse, InterviewSingleResponse, \
    InterviewChatType, InterviewQuestionResponse , \
    SubmitInterviewQuestion, LLMResponse_TopicGenerateType,  LLMQuestionType
from app.agents.ask_llm import ask_llm
from app.core.config import LLM_MODEL
from app.prompts.prompts import question_generating_prompt, generate_interview_topics
from pydantic import ValidationError
from app.agents.interview_question_generate import QuestionGenerator

from app.core.ws import send_socket_status

interview_routes = APIRouter(
    prefix='/private',
)

@interview_routes.post("/interview", response_model=InterviewSingleResponse, status_code=status.HTTP_201_CREATED)
def init_chat(req: Request, data: InterviewSetupType, db: Session = Depends(get_db)):
    try:
        # 1. Insert Row in Interview table
        interview = Interview(
            role=data.role,
            technology=data.technology,
            experience=data.experience,
            difficulty=data.difficulty,
            duration=data.duration,
            question_type=data.question_type,
            status="active",
            user_email=req.state.user['user_email'],
        )

        db.add(interview)
        db.flush()
        db.refresh(interview)

        # 2. Generate topics from LLM using prompt
        prompt = generate_interview_topics(
            role=interview.role,
            technology=interview.technology,
            experience=interview.experience,
            difficulty=interview.difficulty,
            duration=interview.duration,
            question_type=interview.question_type,
        )

        response = ask_llm(prompt)
        print("First LLM Response", response)
        response_topics: LLMResponse_TopicGenerateType = response["text"]
        topics_usage = response.usage
        
        llm_usage = LLMUsage(
            model=LLM_MODEL,
            reference_name="interviews.id",
            reference_id=interview.id,
            prompt_tokens=topics_usage.prompt_tokens,
            completion_tokens=topics_usage.completion_tokens,
            total_tokens=topics_usage.total_tokens
        )
        db.add(llm_usage)
        db.flush()
        """ 
        =======================
        STORE USAGE TOKENS IN USAGE TABLE
        =======================
        
        """

        # FIX: reference response_topics (not the not-yet-defined `topics`)
        # 3. From the response, update the estimated_questions in interview table
        update_stmt = (
            update(Interview)
            .where(Interview.id == interview.id)
            .values(estimated_questions=int(response_topics["estimated_questions"]))
        )
        db.execute(update_stmt)
        db.flush()

        # FIX: renamed loop var to avoid shadowing + actually add the row to the session
        # 4. From the LLM response, Insert rows in interview_topics table
        for topic_item in response_topics["topics"]:
            topic_row = InterviewTopics(
                interview_id=interview.id,
                order=topic_item["order"],
                topic=topic_item["topic"],
                difficulty=topic_item["difficulty"]
            )
            db.add(topic_row)

        db.flush()
        db.commit()
        
        # =========================== Question Generating Process ===========================
        
        # from app.agents.interview_question_generate import QuestionGenerator
        
        question_generator = QuestionGenerator(db)
        
        question_generator.generate_first_question(interview.id)
        
        
        # =========================== Question Generating Process ===========================

        db.commit()
        # FIX: refresh needs a target object; refresh `interview` so estimated_questions/status are current
        db.refresh(interview)

        return {
            "success": True,
            "message": "Interview Started",
            "interview_info": interview,
            "error": ""
        }

    except Exception as e:
        # FIX: roll back so a failed request doesn't poison the session for later requests
        db.rollback()
        print("Error occured during POST /interview")
        print("Error: ", str(e))
        tb = traceback.extract_tb(e.__traceback__)
        print(f"Line: {tb[-1].lineno}")
        raise HTTPException(
            detail="Something went wrong",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# ================================ GET/ interview ==============================
@interview_routes.get("/interview/{interview_id}", response_model=InterviewSingleResponse, status_code=status.HTTP_200_OK)
def get_chat(interview_id:str, db:Session = Depends(get_db)):
    # print("Request recieved to this route")
    try:
        # print("Topic Name: ", data.topicName)
        # print("Interview ID: ", interview_id)
        response = db.query(Interview).filter(Interview.id == interview_id).first()

        if response is None:
            raise HTTPException(
                detail="Interview not found",
                status_code=status.HTTP_404_NOT_FOUND
            )
        # print("Fetched Interview ID: ", response.interview_id)
        return {
            "message" : "Interview details fetched", 
            "interview_info": response,
            "success": True,
            "error": ""
        }
        # return JSONResponse(
        #     content={"message" : "Interview details fetched", "interview_info": response},
        #     status_code=status.HTTP_201_CREATED
        # )
    except HTTPException:
        raise
    except Exception as e:
        print(str(e))
        raise HTTPException(
            detail="Failed to fetch interview details",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        # return {
        #     "message" : "Failed to fetch interview details", 
        #     "interview_info": None,
        #     "success": False,
        #     "error": str(e)
        # }
        
# ================================ GET/ interview?status=active ==============================
@interview_routes.get("/interview", response_model=InterviewListResponse, status_code=status.HTTP_200_OK)
def get_interviews(req: Request, db:Session = Depends(get_db)):
    try:
        user = req.state.user
        interview_status = req.query_params.get("status")
        limit = int(req.query_params.get("limit", 10))
        skip = (int(req.query_params.get("page", 1)) - 1) * limit

        print(req.query_params)
        interviews = []
        base_query = None
        rows_count = 0
        if interview_status == "active":
            base_query = (
                db.query(Interview)
                    .filter(Interview.status == 'active')
            )
            # rows_count = base_query.count()

            # print(interviews)
        elif interview_status == "completed":
            base_query = db.query(Interview).filter(Interview.status == "completed")
        elif interview_status == "all":
            base_query = db.query(Interview)
        
        
        interviews = (
                        base_query
                            .order_by(Interview.created_at.desc())
                            .offset(skip)
                            .limit(limit)
                            .all()
                    )
        rows_count = len(interviews)
        return {
            "message" : "List fetched successfully",
            "rows_count": rows_count,
            "interviews" : interviews
        }
    # JSONResponse(
    #         content={
    #             "interviews" : interviews
    #         },
    #         status_code=status.HTTP_200_OK
    #     )
    except Exception as e:
        print(e)
        return JSONResponse(
            content={"interviews": [], "error": str(e)},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

# ================================
@interview_routes.get("/interview/{interview_id}/chat", response_model=InterviewChatType, status_code=status.HTTP_200_OK)
def get_chat_by_interivew_id(interview_id: str, db: Session = Depends(get_db)):
    try:
        chat = db.query(InterviewChat).filter(InterviewChat.interview_id == interview_id).order_by(InterviewChat.created_at.asc()).all()
        print("Chat Type: ", type(chat))
        return {
            "success": True,
            "message" : "Chat information fetched successfully",
            "chat" : chat
        }
    except Exception as e: 
        print(str(e))


# ================================
@interview_routes.post("/interview/{interview_id}/question", response_model=InterviewQuestionResponse,status_code=status.HTTP_201_CREATED)
def generate_question(interview_id:str, db:Session=Depends(get_db)):
    try:
        # =========================== Question Generating Process ===========================
        question_generator = QuestionGenerator(db, interview_id)
        
        result = question_generator.analyze_and_next_question(interview_id)
        
        if result['completed']:
            return {
                "success": True,
                "message": "Interview completed",
                "chatMessage" : None
            }
            
        db.commit()
        
        # =========================== Question Generating Process ===========================
            
    except Exception as e:
        print(str(e))
        print(" =================================================== ")
        tb = traceback.extract_tb(e.__traceback__)
        print(f"Error Info: {tb[-1].filename}, line: {tb[-1].lineno}")
        print(" =================================================== ")
        return {
            "success": False,
            "message": "Failed",
            "chatMessage" : None
        }
# ================================
@interview_routes.post("/interview/{interview_id}/chat")
async def save_user_answer(interview_id: str, data:SubmitInterviewQuestion, db:Session = Depends(get_db)):
    try:
        await send_socket_status(interview_id, "Started saving message.")
        message = InterviewChat(
            interview_id=interview_id,
            topic_id = data.topic_id,
            response=data.answer,
            responded_by="user",
            response_status="success"
        )
        

        db.add(message)
        db.flush()
        await send_socket_status(interview_id, "Message saved.")
        
        question_generator = QuestionGenerator(db, interview_id)
                
        result = await question_generator.analyze_and_next_question()
        
        db.commit()
        db.refresh(message)


        # print(interview_id)

        return {
            "message": "Answer saved successfully & Question generated",
            "success": True,
            "chatMessage": [message, result.get("message", None)]
        }
    except Exception as e:
        print(str(e))
        # tb = traceback.extract_tb(e.__traceback__)
        # print(f"Line: {tb[-1].lineno}")
        traceback.print_exc()
        raise HTTPException(
            detail="something went wrong",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )