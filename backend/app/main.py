from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.health import router as health_router
from app.routers.skills import router as skills_router
from app.routers.match import router as match_router
from app.routers import resume

app = FastAPI()

# ✅ CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# regiser routers
app.include_router(health_router)
app.include_router(skills_router)
app.include_router(match_router)
app.include_router(resume.router)
