import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { publicGateway } from '../services/gateway';


const ReportIssue = () => {
  const [issue,setIssue]=useState("")
  
  const AddIssue = () => {
    const issueData = {
      Issue:issue
    };
    const token = localStorage.getItem('accessToken');
console.log(issueData)
    publicGateway
      .post('/report/CreateReport', issueData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          alert('Error occurred');
        } else {
          alert('Successfully added Issue');
          setIssue("")

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <fieldset style={formFieldsetStyle}>
          <label style={formLabelStyle}>Issue</label>
          <textarea value={issue}  onChange={(e) => setIssue(e.target.value)} style={formInputStyle}></textarea>
          <br /><br />
          <input onClick={AddIssue}type="button" value={"Submit"} style={formButtonStyle} /><br /><br />
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
