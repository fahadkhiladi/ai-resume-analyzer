import { useState } from "react";

function ResumeUpload({ onFileSelect }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Allow only PDF and DOCX
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file only.");
      event.target.value = null;
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        <strong>Upload Resume (PDF or DOCX)</strong>
      </label>
      <br />
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

      {file && (
        <p style={{ marginTop: "8px" }}>
          📄 Selected file: <strong>{file.name}</strong>
        </p>
      )}
    </div>
  );
}

export default ResumeUpload;
