import React, { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const customStyles = {
    overlay:{
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const LoginModal_Second = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleSubmit = () => {
        // Prepare login data
        const loginData = {
            email,
            password
        };

        // Send login data to backend endpoint
        axios.post("http://localhost:5500/login", loginData)
            .then(response => {
                const { message, isAuthenticated,token } = response.data;
                if (isAuthenticated) {
                    console.log(JSON.stringify(loginData)); // Log login data to console
                    localStorage.setItem("token",JSON.stringify(token))
                    window.alert("Logged In successfully") // Handle login success
                    setIsLoggedIn(true); // Set login status to true
                    // Clear input fields
                    setEmail("");
                    setPassword("");
                    setErrorMessage("");
                    // Close the modal after successful login
                    onClose();
                    // Navigate to the desired route
                     window.location.href = "/"
                } else {
                    // Display error message if login fails
                    setErrorMessage(message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleLogout = () => {
        // Implement logout functionality (clear session, etc.)
        // For example:
        setIsLoggedIn(false); // Update login status to false
        // Redirect to the appropriate page (e.g., home page)
        navigate("/");
    };

    return (
        <div>
            {!isLoggedIn ? ( // If not logged in, display login modal
                <Modal isOpen={isOpen} style={customStyles}>
                    <div>
                        <h4 style={{ color: "#192F60" }} className="fw-bold d-inline">Login</h4>
                        <div onClick={onClose} className="close"><i className="bi bi-x-lg"></i></div>
                    </div>
                    <div>
                        <div className="m-5">
                            <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" className="form-control mb-2" />
                            <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" className="form-control mb-2" />
                            <button type="button" className="btn btn-outline-success px-4" onClick={handleSubmit}>Login</button>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </div>
                    </div>
                </Modal>
            ) : (
                <div className="d-flex align-items-center">
                    <span className="text-white me-3">Logged in as: {email}</span>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default LoginModal_Second;
