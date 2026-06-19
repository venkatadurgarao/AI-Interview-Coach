import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

# print(os.getenv("GEMINI_API_KEY"))
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
def ask_llm(prompt):
    response = client.models.generate_content(
        model=os.getenv("LLM"),
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.1,
            response_mime_type="application/json"
        )
    )
    return json.loads(response.text)
    