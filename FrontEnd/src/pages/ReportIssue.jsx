import React from "react";
import Sidebar from "../components/Sidebar";

const ReportIssue = () => {
  return (
    <div>
      <form>
        <fieldset style={formFieldsetStyle}>
          <label style={formLabelStyle}>Issue</label>
          <textarea style={formInputStyle}></textarea>
          <br /><br />
          <input type="submit" style={formButtonStyle} /><br /><br />
          <input type="reset" style={formButtonStyle} /><br /><br />
        </fieldset>
      </form>
    </div>
  );
};

const formFieldsetStyle = {
  border: "1px solid #ccc",
  padding: "20px",
  borderRadius: "5px",
};

const formLabelStyle = {
  display: "block",
  marginBottom: "10px",
  fontSize: "16px",
  fontWeight: "bold",
};

const formInputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "3px",
};

const formButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ReportIssue;
