from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import spacy
from pathlib import Path

router = APIRouter()

# Load spaCy model once
nlp = spacy.load("en_core_web_sm")

# Load skills list
skills_file = Path("app/core/skills_list.txt")
if not skills_file.exists():
    raise FileNotFoundError("skills_list.txt not found")

with open(skills_file, "r", encoding="utf-8") as f:
    SKILLS = [skill.strip().lower() for skill in f if skill.strip()]


class ResumeText(BaseModel):
    resume_text: str


@router.post("/resume/extract-skills")
def extract_skills(data: ResumeText):
    if not data.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is empty")

    # 1. Lowercase text
    text = data.resume_text.lower()

    # 2. Process with spaCy
    doc = nlp(text)

    # 3. Match skills
    found_skills = set()

    for skill in SKILLS:
        if skill in text:
            found_skills.add(skill.title())

    return {
        "skills_found": sorted(found_skills),
        "total_skills": len(found_skills)
    }
