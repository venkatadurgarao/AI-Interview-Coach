def generate_interview_topics(
    role: str,
    technology: str,
    experience: str,
    difficulty: str,
    duration: str,
    question_type: str
):
    return f"""
You are a senior technical interviewer responsible for designing a structured interview plan.

Candidate Details

Role: {role}
Technology: {technology}
Experience: {experience}
Difficulty: {difficulty}
Interview Duration: {duration}
Question Type: {question_type}

Your task is to create an interview plan.

Instructions

1. Generate enough interview topics to approximately fill the interview duration.
2. Arrange topics from beginner to advanced.
3. Do not repeat similar topics.
4. Cover a broad range of concepts within the selected technology.
5. Topics must be appropriate for the candidate's experience level.
6. Each topic should normally require one primary question and, if necessary, one follow-up question.
7. If Question Type is:
- Theory: Generate theory-oriented topics.
- Coding: Generate coding-oriented topics.
- Debugging: Generate debugging-oriented topics.
- Scenario Based: Generate practical scenario-based topics.
- Behavioral: Generate behavioral topics.
- System Design: Generate architecture and design topics.
- Mixed: Generate a balanced mix of all applicable topic types.
8. The interview should gradually increase in difficulty.
9. Do not include explanations.
10. Return only valid JSON.
11. Do not use markdown or code fences.

Return JSON in exactly this format:

{{
    "estimated_questions": <integer>,
    "topics": [
        {{
            "order": 1,
            "topic": "string",
            "difficulty": "Beginner | Intermediate | Advanced | Expert",
            "question_type": "Theory | Coding | Debugging | Scenario Based | Behavioral | System Design"
        }}
    ]
}}
"""









def question_generating_prompt(
    role: str,
    technology: str,
    experience: str,
    difficulty: str,
    question_type: str,
    
    topic: str,
    context: str,
    follow_up_asked: bool,
    
    previous_topic: str,
    previous_topic_q_and_a: str
):
    return f"""
You are an experienced technical interviewer.

Candidate Details

Role: {role}
Technology: {technology}
Experience: {experience}
Difficulty: {difficulty}
Question Type: {question_type}

Current Interview Topic
{topic}

Conversation History for this Topic
{context}

Previous Topic
{previous_topic}

Previous Topic Question and Answer
{previous_topic_q_and_a}

Follow-up Already Asked
{follow_up_asked}

Instructions

1. Generate exactly ONE interview question.
2. The question must be strictly related to the current topic.
3. Read the conversation history before generating the next question.
4. Never repeat a previously asked question.
5. If the candidate's previous answer is incomplete, incorrect, or lacks sufficient detail:
   - Ask ONE follow-up question only.
   - If Follow-up Already Asked is True, do NOT ask another follow-up.
6. If the previous answer is satisfactory, ask a new question using current topic.
7. Match the question difficulty to the candidate's experience level.
8. If Question Type is:
   - Theory → ask a conceptual question.
   - Coding → ask a coding problem.
   - Debugging → present a debugging scenario.
   - Scenario Based → ask a real-world situation.
   - Behavioral → ask a behavioral question.
   - System Design → ask a design-related question.
   - Mixed → choose the most appropriate type.
9. Do not explain the answer.
10. Do not provide hints.
11. Do not evaluate the candidate.
12. Return only valid JSON.
13. Do not use markdown or code fences.

Return JSON:

{{
    "question": "...",
    "topic" : "{previous_topic}" | "{topic}"
}}
"""

def first_question_prompt(
    role: str,
    technology: str,
    experience: str,
    difficulty: str,
    question_type: str,
    topic: str
):
    return f"""
You are an expert technical interviewer conducting a professional interview.

Candidate Profile:
- Role: {role}
- Technology: {technology}
- Experience: {experience}
- Difficulty Level: {difficulty}
- Question Type: {question_type}

Interview Topic:
{topic}

Your task:
Generate exactly ONE interview question.

Rules:
1. The question must be strictly related to the given interview topic.
2. Match the complexity to the candidate's experience and requested difficulty.
3. Ask only ONE question.
4. Do NOT include multiple sub-questions unless they are required for a single coding problem.
5. Do NOT include explanations, hints, examples, solutions, or expected answers.
6. Do NOT greet the candidate or add introductory text.
7. Do NOT mention the topic name in the question unless it is naturally required.
8. Return ONLY valid JSON.
9. Do NOT use Markdown or code fences.

Question Type Guidelines:
- Theory → Ask a conceptual question.
- Coding → Ask one coding problem with clear requirements.
- Debugging → Present a buggy code or debugging scenario.
- Scenario Based → Ask a realistic practical situation.
- Behavioral → Ask about past experiences or decision-making.
- System Design → Ask one scalable system design question.
- Mixed → Select the most appropriate question type for the topic and candidate profile.

Return exactly this JSON format:

{{
    "question": "<generated question>"
}}
"""


def next_question_prompt(
    role: str,
    technology: str,
    experience: str,
    difficulty: str,
    question_type: str,
    
    current_topic: str,    
    current_question: str,
    candidate_answer: str,
    
    next_topic: str,
    previous_questions: str,
):
    return f"""
You are an experienced technical interviewer conducting a professional interview.

Candidate: {role}, {technology}, {experience} experience, {difficulty} difficulty, question type: {question_type}

Current Topic: {current_topic}
Current Question: {current_question}
Candidate's Answer: {candidate_answer}
Next Topic: {next_topic}
Previously Asked Questions: {previous_questions}

TASK
Evaluate the candidate's answer, then decide the next interview question.

EVALUATE based on: technical correctness, completeness, relevance, conceptual understanding, missing concepts, explanation quality. Do not reward keyword usage without real understanding.

SCORING
- score (0-100 overall): 90-100 excellent, 75-89 good, 60-74 average, 40-59 weak, 0-39 poor.
- technical_accuracy, completeness, relevance: each scored 0-100 independently.
- answer_quality: one of "excellent" | "good" | "average" | "weak" | "poor", consistent with the score.

DECISION RULES
- Answer sufficient → follow_up_required=false, next_action="next_topic", ask a new question on Next Topic.
- Answer insufficient → follow_up_required=true, next_action="follow_up", ask exactly ONE follow-up on the single most important missing/incorrect concept, staying within Current Topic.
- Never ask more than one follow-up for the same question.
- Never repeat a question from Previously Asked Questions.
- The next question must fit the candidate's experience and difficulty.

QUESTION TYPE (for the next question)
theory=conceptual question | coding=programming problem | debugging=debugging problem | scenario based=realistic scenario | behavioral=professional behavioral question | system design=system design question | mixed=pick whichever type fits current_topic best.

IMPROVED ANSWER
Rewrite candidate_answer correcting mistakes, adding missing key concepts, staying concise and matched to experience level, with no unrelated info.

OUTPUT RULES
- Do not evaluate the candidate or explain your reasoning inside "question".
- Do not give hints in "question".
- No markdown. Return only valid JSON, nothing outside it.

Return exactly this JSON structure:
{{
    "score": 0,
    "technical_accuracy": 0,
    "completeness": 0,
    "relevance": 0,
    "answer_quality": "excellent | good | average | weak | poor",
    "strengths": ["string"],
    "weaknesses": ["string"],
    "missing_concepts": ["string"],
    "improved_answer": "string",
    "follow_up_required": false,
    "follow_up_reason": "string",
    "next_action": "follow_up | next_topic",
    "question": "string",
    "topic": "string",
    "question_type": "string"
}}
"""