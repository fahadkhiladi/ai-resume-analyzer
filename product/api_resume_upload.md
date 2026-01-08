# API Contract: Resume Upload Endpoint

Endpoint URL:
/resume/upload

HTTP Method:
POST

Purpose:
This endpoint allows users to upload a resume file (PDF or DOCX) so that the system can extract and analyze its text content.

Input:

A single file upload

Accepted file formats: PDF (.pdf) and Word document (.docx)

File is sent using form-data

Output (JSON Response):

filename: Name of the uploaded resume file

text_length: Total number of characters extracted from the resume

preview: The first 300 characters of the extracted text for quick review

Example Response:

`{
  "filename": "resume.pdf",
  "text_length": 2450,
  "preview": "Experienced software developer with strong skills in Python, FastAPI, and database systems..."
}`


