import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import NavBar from './NavBar';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const title = "Register Now";
const socialTitle = "OR";
const btnText = "Create Account";

export const Signup = () => {
    
    const [errorMessage, setErrorMessage] = useState(""); //Fixed the seterrorMessage. case sensitive error
    const {signUpWithGmail, createUser} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const googleProvider = new GoogleAuthProvider();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const result = await signUpWithGmail();
            const user = result.user;
            const email = user.email;
            const name = user.displayName;
    
            // Send user data to backend
            const response = await axios.post('https://commerce-app-adminserver.onrender.com/users', {
                name,
                email,
                role: 'user' // Default role
            });
    
            // Handle successful signup
            alert("Account created successfully!");
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            if (error.code === "auth/cancelled-popup-request") {
                setErrorMessage("Sign up with Google cancelled.");
            } else {
                setErrorMessage("Failed to sign up or create account. Please try again.");
            }
        }
    };    
    
    
    const handleSignup = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Password does not match! Please input a correct password!");
            return;
        }else{
            setErrorMessage("");

            try {
                createUser(email, password).then((userCredential) =>{
                    const user = userCredential.user;
                    // alert("Account created successfully!")
                    navigate(from, {replace: true})
                })
                // Send user data to backend
                const response = await axios.post('https://commerce-app-adminserver.onrender.com/users', {
                    name,
                    email,
                    role: 'user' // Default role
                });
    
                // Handle successful signup
                alert("Account created successfully!");
                navigate(from, { replace: true });
            } catch (error) {
                // Handle signup failure
                console.error(error);
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message); // Set the error message from the response data
                } else {
                    setErrorMessage("Failed to create account. Please try again later.");
                }
                
            }
        }


    };
    
    return (
        <div>
            <NavBar/>
            <div className='new-login-section' style={{backgroundImage:"url('/images/customphotos/background10.jpeg')"}}>
                <div style={{ marginTop: '60px' }} className="new-container">
                    <div className="new-account-wrapper">
                        <h3 className="new-title">{title}</h3>
                        <form className='new-account-form' onSubmit={handleSignup}>
                            <div className='new-form-group'>
                                <input type="text" name="name" id="name" placeholder='User Name *' required/>
                            </div>
                            <div className='form-group'>
                                <input type="email" name="email" id="email" placeholder='Email Address *' required/>
                            </div>
                            <div className='form-group'>
                                <input type="password" name="password" id="password" placeholder='Password *' required/>
                            </div>
                            <div className='form-group'>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password *' required/>
                            </div>
                            <div>
                                {/* Showing message */}
                                {errorMessage && (
                                    <div className='new-error-message'>
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='new-button'>
                                    <span>{btnText}</span>
                                </button>
                            </div>
                        </form>
    
                        {/* Social login moved here to appear above the account bottom */}
                        <h5 className='new-subtitle'>{socialTitle}</h5>
                        <ul className='new-social-icons'>
                            <li>
                                <a href="/" className='google-btn' onClick={handleRegister}>
                                    <img src="/images/Google-button.png" 
                                         alt="Google" style={{verticalAlign: "middle"}}/>
                                    Sign Up with Google
                                </a>
                            </li>
                        </ul>
    
                        {/* Account bottom */}
                        <div className='new-account-bottom'>
                            <span className='new-account-message'>
                                Already have an account?
                                <a href="/login" className='new-signup-link' style={{paddingLeft: 50, paddingRight: 50, color: 'black'}}>Login</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    

}