# Skill Extraction Logic (Plain English Explanation)

1. The extracted resume text is first converted to lowercase so that skill matching is not affected by capital letters.

2. The cleaned text is then processed using the spaCy NLP model to break the text into meaningful tokens and phrases.

3. A predefined list of skills is loaded from the skills_list.txt file, and each skill is also converted to lowercase for consistent comparison.

4. The system checks whether each skill from the skill list appears in the processed resume text.

5. When a skill is found in the resume text, it is added to a results list.

6. Duplicate skills are removed so that each skill appears only once in the final output.

7. The final result is a clean list of matched skills extracted from the resume, ready for comparison with a job description.