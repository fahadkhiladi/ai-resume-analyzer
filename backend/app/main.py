from fastapi import FastAPI
from app.routers.health import router as health_router
from app.routers.skills import router as skills_router
from app.routers.match import router as match_router

app = FastAPI()

app.include_router(health_router)
app.include_router(skills_router)
app.include_router(match_router)
