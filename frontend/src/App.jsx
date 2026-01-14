import { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";

function App() {
  const [resumeFile, setResumeFile] = useState(null);

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2>AI Resume Analyzer</h2>

      <ResumeUpload onFileSelect={setResumeFile} />

      <button disabled={!resumeFile}>
        Analyze Resume
      </button>
    </div>
  );
}

export default App;
