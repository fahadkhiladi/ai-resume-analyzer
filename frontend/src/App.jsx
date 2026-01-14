import { useState } from "react";
import axios from "axios";
import ResumeUpload from "./components/ResumeUpload";
import JobDescriptionInput from "./components/JobDescriptionInput";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isJDValid = jobDescription.length >= 50;

  const handleAnalyze = async () => {
    if (!resumeFile || !isJDValid) return;

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Upload resume
      const formData = new FormData();
      formData.append("file", resumeFile);

      const uploadResponse = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const resumeText = uploadResponse.data.text;

      // 2️⃣ Send resume text + JD for matching
      const matchResponse = await axios.post(
        "http://127.0.0.1:8000/match-resume",
        {
          resume_text: resumeText,
          job_description: jobDescription,
        }
      );

      // 3️⃣ Log result
      console.log("MATCH RESULT:", matchResponse.data);

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Resume Analyzer</h2>

      <ResumeUpload onFileSelect={setResumeFile} />

      <JobDescriptionInput onTextChange={setJobDescription} />

      <button
        onClick={handleAnalyze}
        disabled={!resumeFile || !isJDValid || loading}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
