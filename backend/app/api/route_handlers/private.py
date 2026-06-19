from fastapi import Request, status
from fastapi.responses import JSONResponse

def dashboard(req: Request):
    try: 
        response = JSONResponse(
            content={"page" : "dashboard"},
            status_code=status.HTTP_200_OK
        )
        return response
    except Exception as e: 
        pass
