import { useState } from "react";

function JobDescriptionInput({ onTextChange }) {
  const [text, setText] = useState("");
  const MIN_LENGTH = 50;

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    onTextChange(value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        <strong>Job Description</strong>
      </label>

      <textarea
        rows="8"
        style={{ width: "100%", marginTop: "8px" }}
        placeholder="Paste the full job description here (skills, requirements, responsibilities)..."
        value={text}
        onChange={handleChange}
      />

      <p style={{ fontSize: "12px", marginTop: "5px" }}>
        {text.length < MIN_LENGTH ? (
          <span style={{ color: "red" }}>
            Minimum {MIN_LENGTH} characters required
          </span>
        ) : (
          <span style={{ color: "green" }}>
            Job description length is valid
          </span>
        )}
      </p>
    </div>
  );
}

export default JobDescriptionInput;
