import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types
from app.schema.PydanticSchema import LLMResponse
# load_dotenv()
from app.core.config import LLM_MODEL

# print(os.getenv("GEMINI_API_KEY"))
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
def ask_llm(prompt) -> LLMResponse:
    response = client.models.generate_content(
        model= LLM_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.1,
            response_mime_type="application/json"
        )
    )
    usage: types.GenerateContentResponseUsageMetadata = response.usage_metadata



    response = json.loads(response.text)
    return {
        "text": response,
        "usage" : {
            "prompt_tokens" : usage.prompt_token_count,
            "completion_tokens": usage.candidates_token_count,
            "total_tokens": usage.total_token_count
        }
    }

    # return json.loads(response.text)
    