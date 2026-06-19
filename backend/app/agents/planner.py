from ask_llm import ask_llm
def planner(query):
    prompt = f"""
        You are a great planner
        
        using the given query prepare the list of topics for interview.
        - Return JSON
        
        JSON:
        {{
            "topics" : ["string"],
            "query" : "string"
        }}
        
        query:
        {query}
    """
    
    return ask_llm(prompt)