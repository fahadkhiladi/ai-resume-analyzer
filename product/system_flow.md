# System Flow 

1. The user opens the React web application in a browser.

2. The user uploads a CV (PDF or DOCX) and pastes the job description into the text area.

3. The React frontend sends the CV file and job description to the FastAPI backend using an API request.

4. The FastAPI backend extracts text from the uploaded CV using document processing tools.

5. The backend uses NLP techniques to extract skills from both the CV and the job description.

6. A matching algorithm compares the extracted skills from the CV with the job description skills.

7. The backend calculates the match percentage, identifies matched skills and missing skills.

8. The analysis results are sent back to the React frontend as a response.

9. The frontend displays the match percentage, matched skills, and missing skills to the user.