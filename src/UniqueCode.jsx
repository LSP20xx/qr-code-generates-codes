import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FaDownload } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado
import './UniqueCode.css'; // Importa el archivo de estilos

function UniqueCode() {
    const [uniqueCode, setUniqueCode] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        generateUniqueCode();
    }, []);

    useEffect(() => {
        if (uniqueCode) {
            downloadCode();
        }
    }, [uniqueCode]);

    const generateUniqueCode = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let result = '';
        for (let i = 0; i < 3; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        for (let i = 0; i < 2; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        setUniqueCode(result);
    };

    const sendEmail = () => {
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            code: uniqueCode,
            to_email: email,
        }, 'YOUR_USER_ID')
            .then((response) => {
                alert('Email sent successfully!');
            }, (error) => {
                alert('Failed to send email. Please try again.');
            });
    };

    const downloadCode = () => {
        const element = document.createElement('a');
        const file = new Blob([uniqueCode], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'unique_code.txt';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element); // Remove the element after clicking
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                />
                <button onClick={sendEmail} className="send-button">
                    Send Code to Email
                </button>
            </div>
        </div>
    );
}

export default UniqueCode;
