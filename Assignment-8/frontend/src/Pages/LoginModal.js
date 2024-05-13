// LoginModal.js
import React, { useState } from "react";
import Modal from 'react-modal';
import LoginModal_Second from "./LoginModal_second";
import SignupModal from "./SignupModal"; // Import SignupModal component
import '../Style/authentication.css'

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

const LoginModal = ({ isOpen, onClose, onGoogleLogin, onLoginClick }) => {
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State to track the visibility of the signup modal
   
    const openSecondModal = () => {
        setIsSecondModalOpen(true);
    }

    const closeSecondModal = () => {
        setIsSecondModalOpen(false);
    }

    const openSignupModal = () => {
        setIsSignupModalOpen(true);
    }

    const closeSignupModal = () => {
        setIsSignupModalOpen(false);
    }

    const openLoginModal = () => {
       
        setIsSignupModalOpen(false); // Close signup modal if open
        setIsSecondModalOpen(false); // Open login modal
    }

    return (
        <>
            <Modal isOpen={isOpen} style={customStyles}>
                <div>
                    <h4 style={{color: "#192F60;" }} className="fw-bold d-inline">Login</h4>
                    <div onClick={onClose} className="close"><i className="bi bi-x-lg"></i></div>
                </div>
                <div>
                    <div className="m-5">
                        <button className="btn btn-outline-success px-4" onClick={onGoogleLogin}><i class="bi bi-google"></i><span className="icons"> Login with Google</span></button>
                    </div>
                    
                    <div className="m-5">
                        <button className="btn btn-outline-success px-4 ms-4" onClick={openSecondModal}><i class="bi bi-person-circle"></i><span className="icons">User Login</span></button>
                        <hr />
                    </div>
                    <span>Don’t have account?  <button onClick={openSignupModal} className="btn btn-outline-success px-4">Signup</button></span>
                </div>
            </Modal>

            {/* Render LoginModal_Second if the second modal is open */}
            {isSecondModalOpen && <LoginModal_Second isOpen={isSecondModalOpen} onClose={closeSecondModal} />}

            {/* Render SignupModal if the signup modal is open */}
            {isSignupModalOpen && <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} onLoginClick={openLoginModal} />}
        </>
    );
}

export default LoginModal;
