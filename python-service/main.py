import os
import uuid

import uvicorn
from fastapi import FastAPI, Header, HTTPException
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from pydantic import BaseModel, Field

from agents import root_agent, root_agent_interna

app = FastAPI(title="Anita Agents API", version="1.0.0")

SESSION_SERVICE = InMemorySessionService()

RUNNERS = {
  "anita_contadora": Runner(
    agent=root_agent,
    app_name="anita_contadora",
    session_service=SESSION_SERVICE,
  ),
  "anita_interna": Runner(
    agent=root_agent_interna,
    app_name="anita_interna",
    session_service=SESSION_SERVICE,
  ),
}

ADK_API_KEY = os.getenv("ADK_API_KEY", "")
DEFAULT_APP = os.getenv("ADK_DEFAULT_APP", "anita_contadora")


class ChatRequest(BaseModel):
  app_name: str = Field(default=DEFAULT_APP)
  message: str = Field(min_length=1)
  user_id: str | None = None
  session_id: str | None = None


@app.get("/health")
async def health() -> dict:
  return {"status": "ok", "apps": list(RUNNERS.keys())}


@app.post("/v1/chat")
async def chat(body: ChatRequest, x_adk_api_key: str | None = Header(default=None)) -> dict:
  if ADK_API_KEY and x_adk_api_key != ADK_API_KEY:
    raise HTTPException(status_code=401, detail="API key inválida")

  if body.app_name not in RUNNERS:
    raise HTTPException(status_code=404, detail=f"Agente '{body.app_name}' no existe")

  runner = RUNNERS[body.app_name]
  user_id = body.user_id or f"usr_{uuid.uuid4().hex}"
  session_id = body.session_id or f"ses_{uuid.uuid4().hex}"

  try:
    await SESSION_SERVICE.create_session(
      app_name=body.app_name, user_id=user_id, session_id=session_id
    )
  except Exception:
    pass

  content = types.Content(role="user", parts=[types.Part(text=body.message)])

  texts: list[str] = []
  async for event in runner.run(
    user_id=user_id,
    session_id=session_id,
    new_message=content,
  ):
    if event.is_final_response():
      for part in event.content.parts:
        if part.text:
          texts.append(part.text)

  if not texts:
    raise HTTPException(status_code=500, detail="El agente no produjo una respuesta")

  return {
    "text": "\n".join(texts),
    "session_id": session_id,
    "user_id": user_id,
  }


if __name__ == "__main__":
  port = int(os.environ.get("PORT", 8080))
  uvicorn.run(app, host="0.0.0.0", port=port)
