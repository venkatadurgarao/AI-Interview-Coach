import celery
from celery import Celery
from backend.app.core.config import REDIS_URL



celery = Celery(
    "ai_interview_coach",
    broker=REDIS_URL,
    backend=REDIS_URL
)

celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
)

# docker run --name redis-server -p 6379:6379 -d redis
# @celery.task
# def evaluate_answer_task(interview_id: str):
#     ...
#     return {
#         "success" : True
#     }