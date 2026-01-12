from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import spacy
from pathlib import Path

router = APIRouter()

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load skills list
skills_file = Path("app/core/skills_list.txt")
with open(skills_file, "r", encoding="utf-8") as f:
    SKILLS = [skill.strip().lower() for skill in f if skill.strip()]


class MatchRequest(BaseModel):
    resume_text: str
    job_description: str


def extract_skills(text: str):
    text = text.lower()
    found = set()

    for skill in SKILLS:
        if skill in text:
            found.add(skill.title())

    return found


@router.post("/match-resume")
def match_resume(data: MatchRequest):
    if not data.resume_text.strip() or not data.job_description.strip():
        raise HTTPException(status_code=400, detail="Resume or Job Description is empty")

    resume_skills = extract_skills(data.resume_text)
    jd_skills = extract_skills(data.job_description)

    matched_skills = sorted(resume_skills & jd_skills)
    missing_skills = sorted(jd_skills - resume_skills)
    extra_skills = sorted(resume_skills - jd_skills)

    if len(jd_skills) == 0:
        match_percentage = 0
    else:
        match_percentage = round((len(matched_skills) / len(jd_skills)) * 100)

    return {
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills
    }
