import React, { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import LoginModal from './LoginModal'; // Import the LoginModal component
import LoginModal_Second from './LoginModal_second'; // Import the LoginModal_Second component
import SignupModal from './SignupModal'; // Import the SignupModal component
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

const Header = ({ user }) => {
    const [loginModal, setLoginModal] = useState(false);
    const [loginModalSecond, setLoginModalSecond] = useState(false);
    const [signupModal, setSignupModal] = useState(false);

    const handleModal = (modalName, value) => {
        if (modalName === 'loginModal') {
            setLoginModal(value);
        } else if (modalName === 'loginModalSecond') {
            setLoginModalSecond(value);
        } else if (modalName === 'signupModal') {
            setSignupModal(value);
        }
    };

    const google = () => {
        window.open("http://localhost:5500/auth/google", "_self");
    };

    const logout = () => {
        window.open("http://localhost:5500/auth/logout", "_self");
        if(localStorage.getItem("token"))
        {
            localStorage.removeItem("token")
            window.location.reload()
        }
    };

    return (
        <div>            
            <div className="position-absolute end-0 me-5 z-3">
                {!user ? (
                    <form className="d-flex nav-form">
                        <button type="button" className="btn btn-danger me-2" onClick={() => handleModal('loginModal', true)}>Login</button>
                        <button type="button" className="btn btn-outline-light" onClick={() => handleModal('signupModal', true)}>Create an account</button>
                    </form>
                ) : (
                    <form className="d-flex nav-form">
                        {
                            user.photos &&   <img src={user.photos[0].value} className="circle" alt="User" />
                        }
                        <p className="text-white m-3">{user.displayName ? user.displayName : user.name}</p>
                       
                        <button type="button" className="btn btn-outline-light" onClick={logout}>Logout</button>
                    </form>
                )}

                {/* Render LoginModal */}
                <LoginModal
                    isOpen={loginModal}
                    onClose={() => handleModal('loginModal', false)}
                    onGoogleLogin={google}
                />

                {/* Render LoginModal_Second */}
                <LoginModal_Second
                    isOpen={loginModalSecond}
                    onClose={() => handleModal('loginModalSecond', false)}
                />

                {/* Render Signup Modal */}
                <SignupModal isOpen={signupModal} onClose={() => handleModal('signupModal', false)}  onLoginClick={() =>{ 
                    handleModal('loginModal', true)
                    // handleModal('loginModalSecond', false)
                    handleModal('signupModal', false)
                  
                    }} />
            </div>
        </div>
    );
}

export default Header;
