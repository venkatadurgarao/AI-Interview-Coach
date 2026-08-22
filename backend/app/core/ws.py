from fastapi import WebSocket, WebSocketDisconnect, APIRouter

websocket_router = APIRouter()

ws_connections: dict[str, WebSocket] = {}


@websocket_router.websocket("/ws/{interview_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    interview_id: str
):
    await websocket.accept()

    ws_connections[interview_id] = websocket

    try:
        while True:
            # Keep the connection alive and wait for client messages
            await websocket.receive_text()

    except WebSocketDisconnect:
        print(f"WebSocket disconnected: {interview_id}")

    except Exception as e:
        print(f"WebSocket error: {e}")

    finally:
        # Only remove this connection if it is still the active connection
        if ws_connections.get(interview_id) is websocket:
            del ws_connections[interview_id]


async def send_socket_status(
    interview_id: str,
    message: str
):
    ws = ws_connections.get(interview_id)

    if ws is None:
        print(f"No WebSocket connection for interview: {interview_id}")
        return

    try:
        await ws.send_json({
            "status": message
        })

    except Exception as e:
        print(f"Failed to send WebSocket message: {e}")

        if ws_connections.get(interview_id) is ws:
            del ws_connections[interview_id]