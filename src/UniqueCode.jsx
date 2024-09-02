import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import "./UniqueCode.css";
import {
  generateUniqueCode,
  saveUniqueCode,
} from "./redux/slices/uniqueCodeSlice";
import { sendEmail } from "./redux/slices/emailSlice";

function UniqueCode() {
  const dispatch = useDispatch();
  const uniqueCode = useSelector((state) => state.uniqueCode.code);
  const emailStatus = useSelector((state) => state.email.status);
  const [email, setEmail] = useState("");

  const institutionId = "66cd96c1562524452738cd6";

  useEffect(() => {
    if (!uniqueCode) {
      dispatch(generateUniqueCode());
    } else {
      // Si ya existe un código, guárdalo en la base de datos si no está guardado
      dispatch(saveUniqueCode({ institutionId, uniqueCode }));
      // Descarga el código automáticamente cuando se genera
      downloadCode();
    }
  }, [dispatch, uniqueCode, institutionId]);

  const downloadCode = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.text("Code", 105, 120, { align: "center" });

    doc.setFontSize(80);
    doc.text(uniqueCode, 105, 160, { align: "center" });

    doc.save("eloheh_unique_code.pdf");
  };

  const handleSendEmail = () => {
    if (email) {
      dispatch(sendEmail({ uniqueCode, email }));
    }
  };

  return (
    <div className="container">
      <h1>Code</h1>
      <p className="code">{uniqueCode}</p>
      <div>
        <FaDownload onClick={downloadCode} className="download-icon" />
      </div>
      <div className="form-container">
        <input
          type="email"
          placeholder="Enter email"
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSendEmail} className="send-button">
          Send Code to Email
        </button>
        {emailStatus === "loading" && <p>Sending email...</p>}
        {emailStatus === "succeeded" && <p>Email sent successfully!</p>}
        {emailStatus === "failed" && <p>Failed to send email.</p>}
      </div>
    </div>
  );
}

export default UniqueCode;
