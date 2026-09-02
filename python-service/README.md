# Anita Agents — Backend Python (Google ADK)

Servicio FastAPI que sirve los agentes de Google ADK de **Contador a tu Servicio**
(Anita / Edwin / Luis) para la landing y el panel interno.

## Apps expuestas

| app_name         | Agente raíz        | Uso                                          |
|------------------|--------------------|----------------------------------------------|
| `anita_contadora`| `ANITA_CONTADORA`  | Chat público de la landing (tono clientes)   |
| `anita_interna`  | `ANITA_INTERNA`    | Chat interno del panel `/admin` (tono técnico) |

## Endpoints

- `GET /health` — estado y apps disponibles
- `POST /v1/chat` — ejecuta el agente
  ```json
  {
    "app_name": "anita_contadora",
    "message": "Hola, ¿qué servicios ofrecen?",
    "user_id": "usr_abc",
    "session_id": "ses_abc"
  }
  ```
  Respuesta:
  ```json
  { "text": "…", "session_id": "ses_abc", "user_id": "usr_abc" }
  ```
  Header opcional `X-ADK-API-KEY` (si `ADK_API_KEY` está definida).

Las sesiones se mantienen en memoria (`InMemorySessionService`); se pierden al
reiniciar el contenedor. Para persistencia real, migrar a Cloud SQL
(`DatabaseSessionService`) o Agent Platform Sessions.

## Requisitos GCP

Los modelos `gemini-3.1-pro-preview` y `gemini-2.5-flash` se invocan vía
**Vertex AI** en location `global` (ver `GlobalGemini` en `agents.py`).

1. `gcloud config set project <PROJECT_ID>`
2. Habilitar APIs:
   ```bash
   gcloud services enable aiplatform.googleapis.com \
     customsearch.googleapis.com \
     artifactregistry.googleapis.com \
     run.googleapis.com \
     cloudbuild.googleapis.com
   ```
3. Crear una **Custom Search JSON API key** y exportarla como
   `GOOGLE_SEARCH_API_KEY` (la usa `GoogleSearchTool`).
4. El service account usado por Cloud Run necesita `roles/aiplatform.user`.

## Despliegue local

```bash
cd python-service
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
export GOOGLE_CLOUD_PROJECT=<PROJECT_ID>
export GOOGLE_SEARCH_API_KEY=<KEY>
# con gcloud auth application-default login activo
uvicorn main:app --host 0.0.0.0 --port 8080
curl -X POST http://localhost:8080/v1/chat \
  -H 'Content-Type: application/json' \
  -d '{"app_name":"anita_contadora","message":"Hola"}'
```

## Despliegue en Cloud Run

```bash
gcloud run deploy anita-agent --source . --region us-central1 \
  --cpu 1 --memory 2Gi --concurrency 4 --min-instances 0 \
  --timeout 300 \
  --set-env-vars GOOGLE_CLOUD_PROJECT=<PROJECT_ID>,GOOGLE_SEARCH_API_KEY=<KEY>,ADK_API_KEY=<SECRETO>
```

La API key `ADK_API_KEY` se comparte con Next.js (header `X-ADK-API-KEY`)
para evitar que el servicio sea invocado por terceros.

## Notas

- `gemini-3.1-pro-preview` puede requerir allowlist en el proyecto. Si falla,
  cambiar el modelo del root por `gemini-2.5-flash` en `agents.py`.
- `GoogleSearchTool` necesita la Custom Search API habilitada y una API key.
