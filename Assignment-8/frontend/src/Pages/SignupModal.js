
import React, { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";

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

const SignupModal = ({ isOpen, onClose, onLoginClick }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    // console.log(onLoginClick);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        // Send signup data to backend endpoint
        axios.post("http://localhost:5500/sighnup", formData)
            .then(response => {
                console.log(response.data); // Handle response from backend as needed
                window.alert("Signed up successfully");
                // Clear input fields
                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
                // Close the modal after successful signup
                onClose();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Modal isOpen={isOpen} style={customStyles}>
            <div>
                <h4 style={{ color: "#192F60" }} className="fw-bold d-inline">Create an account</h4>
                <div onClick={onClose} className="close"><i className="bi bi-x-lg"></i></div>
            </div>
            <div>
                <div className="m-5">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control mb-2" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="form-control mb-2" />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-control mb-2" />
                    <button type="button" className="btn btn-outline-success px-4" onClick={handleSubmit}>Signup</button>
                </div>
            </div>
            <div>
                <span>Already have an account? <button type="button" className="btn btn-outline-success px-4" onClick={() => {
             
                    onLoginClick()
                }}>Log in</button></span>
                
            </div>
            
        </Modal>
        
    );
    
}

export default SignupModal;
