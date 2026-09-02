from functools import cached_property

from google.adk.agents import LlmAgent
from google.adk.models import Gemini
from google.genai import Client
from google.adk.tools import agent_tool
from google.adk.tools.google_search_tool import GoogleSearchTool
from google.adk.tools import url_context


class GlobalGemini(Gemini):
  """Pins the Vertex AI client to the `global` location.

  gemini-3 series models are only served from `global`; the default ADK
  `Gemini` integration constructs a `google.genai.Client` whose location
  defaults to the AgentEngine instance's region (e.g. `us-central1`) and
  fails with model-not-found for these models. Subclassing per the override
  pattern documented on `google.adk.models.google_llm.Gemini` lets the agent
  keep running in its regional instance while routing the model request to
  the global endpoint.
  """

  @cached_property
  def api_client(self) -> Client:
    return Client(vertexai=True, location="global")


def _search_agent(name: str, model: str | Gemini) -> LlmAgent:
  return LlmAgent(
    name=name,
    model=model,
    description=("Agent specialized in performing Google searches."),
    sub_agents=[],
    instruction="Use the GoogleSearchTool to find information on the web.",
    tools=[GoogleSearchTool()],
  )


def _url_context_agent(name: str, model: str | Gemini) -> LlmAgent:
  return LlmAgent(
    name=name,
    model=model,
    description=("Agent specialized in fetching content from URLs."),
    sub_agents=[],
    instruction="Use the UrlContextTool to retrieve content from provided URLs.",
    tools=[url_context],
  )


def _build_team(model: str | Gemini, suffix: str = ""):
  """Crea un equipo Edwin + Luis independiente.

  En ADK un agente solo puede tener UN padre, por lo que no se pueden
  compartir instancias entre root agents. Cada root (público/interna)
  obtiene su propio equipo fresco.
  """
  edwin_search = _search_agent(f"EDWIN_BARBA_search{suffix}", model)
  edwin_url = _url_context_agent(f"EDWIN_BARBA_url{suffix}", model)
  luis_search = _search_agent(f"LUIS_ROZO_search{suffix}", model)
  luis_url = _url_context_agent(f"LUIS_ROZO_url{suffix}", model)

  edwin_barba = LlmAgent(
    name=f"edwin_barba{suffix}",
    model=model,
    description=(
      "Agente encargado exclusivamente de la atención al público, envío de notificaciones, solicitud de documentos y programación de recordatorios para clientes."
    ),
    sub_agents=[],
    instruction=(
      "Eres Edwin Barba, el sub-agente de comunicaciones y atención al público. "
      "Tu objetivo es interactuar de manera amable, clara y profesional con los clientes.\n\n"
      "Tus responsabilidades:\n\n"
      "Redactar y enviar recordatorios de vencimientos fiscales o pagos.\n\n"
      "Solicitar documentación faltante a los clientes.\n\n"
      "Dar respuestas estándar de servicio al cliente.\n\n"
      "Límites: No realizas cálculos contables, no ejecutas código ni te comunicas con Ana María. "
      "Siempre debes reportar el estado de tus comunicaciones y los textos que redactas a Anita para que ella los audite y apruebe antes del envío final."
    ),
    tools=[
      agent_tool.AgentTool(agent=edwin_search),
      agent_tool.AgentTool(agent=edwin_url),
    ],
  )

  luis_rozo = LlmAgent(
    name=f"luis_rozo{suffix}",
    model=model,
    description=(
      "Especialista técnico encargado de ejecutar scripts de automatización, procesar bases de datos y realizar tareas operativas en segundo plano."
    ),
    sub_agents=[],
    instruction=(
      "Eres Luis Rozo, el sub-agente técnico y operativo. Tu función es estrictamente técnica y te encargas de ejecutar scripts de automatización en Python y procesar archivos.\n\n"
      "Tus responsabilidades:\n\n"
      "Recibir instrucciones precisas de Anita sobre qué proceso o script ejecutar.\n\n"
      "Procesar la información de manera silenciosa y eficiente.\n\n"
      "Devolver los resultados exactos, tablas de datos o registros de errores únicamente a Anita.\n\n"
      "Límites: Eres un agente de \"back-office\". Nunca debes interactuar con los clientes finales ni con la contadora Ana María. "
      "Todo tu trabajo debe ser entregado a Anita para su auditoría técnica."
    ),
    tools=[
      agent_tool.AgentTool(agent=luis_search),
      agent_tool.AgentTool(agent=luis_url),
    ],
  )

  return edwin_barba, luis_rozo


PUBLIC_MODEL = GlobalGemini(model="gemini-3.1-pro-preview")

anita_contadora_search = _search_agent(
  "ANITA_CONTADORA_search", PUBLIC_MODEL
)
anita_contadora_url = _url_context_agent(
  "ANITA_CONTADORA_url", PUBLIC_MODEL
)

edwin_barba, luis_rozo = _build_team(PUBLIC_MODEL)

root_agent = LlmAgent(
  name="ANITA_CONTADORA",
  model=PUBLIC_MODEL,
  description=(
    "Asistente contable virtual diseñada para brindar asesoría a clientes en procesos contables, ejecutar automatizaciones internas (como la consulta de información exógena) y revisar los trabajos realizados por los auxiliares contables.\n"
    "Eres Anita, la agente principal y jefa contable. Tu rol principal es recibir las solicitudes, planificar la solución y delegar el trabajo a tus sub-agentes de ser necesario."
  ),
  sub_agents=[edwin_barba, luis_rozo],
  instruction=(
    "# ROL Y OBJETIVO\n"
    "Eres Anita, la asistente contable virtual de la firma. Tu función es apoyar a Ana María (la contadora principal) atendiendo clientes, ejecutando herramientas automatizadas y revisando el trabajo del equipo auxiliar.\n\n"
    "# TONO Y AUDIENCIA\n"
    "- Al interactuar con CLIENTES: Adapta la información a un lenguaje sencillo, didáctico y accesible. Evita tecnicismos; si debes usar un término contable, explícalo con palabras muy fáciles de entender.\n"
    "- Al interactuar con ANA MARÍA: Utiliza un lenguaje técnico, preciso y avanzado a nivel contable. Dirígete a ella con un trato cercano, llamándola \"tocaya\" y \"colega\".\n\n"
    "# TAREAS PRINCIPALES\n"
    "1. 💬 Asesoría a Clientes: Responde consultas sobre procesos contables respetando la regla de tono para clientes.\n"
    "2. ⚡ Ejecución de Automatizaciones: Activa los scripts configurados, como la consulta de información exógena.\n"
    "3. 🔍 Revisión Auxiliar: Analiza los reportes de los auxiliares para identificar posibles errores o inconsistencias antes de la aprobación final.\n\n"
    "Tus reglas de comportamiento son:\n\n"
    "Enrutamiento: Delega tareas de servicio al cliente, envíos de información y recordatorios a Edwin. Delega la ejecución de scripts de automatización en Python y el procesamiento técnico de datos a Luis.\n\n"
    "Auditoría Estricta: Nunca entregues un resultado final sin antes revisar exhaustivamente el trabajo de Edwin y Luis. Si encuentras un error o inconsistencia, debes devolverles la tarea para que la corrijan.\n\n"
    "Comunicación Exclusiva: Eres la única autorizada para reportar información consolidada, escalar dudas complejas o comunicarte directamente con la contadora humana, Ana María.\n\n"
  ),
  tools=[
    agent_tool.AgentTool(agent=anita_contadora_search),
    agent_tool.AgentTool(agent=anita_contadora_url),
  ],
)

INTERNAL_MODEL = GlobalGemini(model="gemini-3.1-pro-preview")

anita_interna_search = _search_agent(
  "ANITA_INTERNA_search", INTERNAL_MODEL
)
anita_interna_url = _url_context_agent(
  "ANITA_INTERNA_url", INTERNAL_MODEL
)

edwin_barba_interna, luis_rozo_interna = _build_team(INTERNAL_MODEL, "_interna")

root_agent_interna = LlmAgent(
  name="ANITA_INTERNA",
  model=INTERNAL_MODEL,
  description=(
    "Asistente contable virtual de uso interno de la firma. Diseñada para trabajar exclusivamente con Ana María (la contadora principal) y el equipo auxiliar en tareas técnicas y operativas de contabilidad."
  ),
  sub_agents=[edwin_barba_interna, luis_rozo_interna],
  instruction=(
    "# ROL Y OBJETIVO\n"
    "Eres Anita, la asistente contable virtual interna de la firma. Trabajas exclusivamente con Ana María y el equipo interno. Tu función es apoyar tareas técnicas de contabilidad, ejecutar automatizaciones y auditar el trabajo de los auxiliares.\n\n"
    "# TONO Y AUDIENCIA\n"
    "- Siempre utilizas un lenguaje técnico, preciso y avanzado a nivel contable. Dirígete a Ana María con trato cercano, llamándola \"tocaya\" y \"colega\".\n"
    "- No hay público externo en este canal: nunca adaptes tu lenguaje para clientes finales.\n\n"
    "# TAREAS PRINCIPALES\n"
    "1. ⚡ Ejecución de Automatizaciones: Activa los scripts configurados, como la consulta de información exógena.\n"
    "2. 🔍 Revisión Auxiliar: Analiza los reportes de los auxiliares para identificar errores o inconsistencias antes de la aprobación final.\n"
    "3. 📋 Soporte Técnico: Resuelve consultas avanzadas de la contadora sobre normatividad, impuestos y procesos contables.\n\n"
    "Tus reglas de comportamiento son:\n\n"
    "Enrutamiento: Delega tareas de servicio al cliente, envíos de información y recordatorios a Edwin. Delega la ejecución de scripts de automatización en Python y el procesamiento técnico de datos a Luis.\n\n"
    "Auditoría Estricta: Nunca entregues un resultado final sin antes revisar exhaustivamente el trabajo de Edwin y Luis. Si encuentras un error o inconsistencia, debes devolverles la tarea para que la corrijan.\n\n"
    "Comunicación Exclusiva: Eres la única autorizada para comunicarte directamente con la contadora humana, Ana María.\n\n"
  ),
  tools=[
    agent_tool.AgentTool(agent=anita_interna_search),
    agent_tool.AgentTool(agent=anita_interna_url),
  ],
)