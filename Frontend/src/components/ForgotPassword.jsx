import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../customcss/Login.css';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        axios.post('https://commerce-app-adminserver.onrender.com/users/reset-password', { email })
            .then(response => {
                setMessage('If an account with that email exists, we have sent an email to reset your password.');
                setTimeout(() => navigate('/'), 5000); // Redirects to homepage after 5 seconds
            })
            .catch(error => {
                console.error('Error sending reset email', error);
                setMessage('Error sending reset email. Please try again.');
            });
    };

    return (
        <div>
            <NavBar />
            <div className='new-login-section padding-tb section-bg'>
                <div className="new-container">
                    <div className="new-account-wrapper">
                        <h3 className="new-title">Reset Password</h3>
                        <form className='new-account-form' onSubmit={handleResetPassword}>
                            <div className='form-group'>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='Enter your email *'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='new-button'>
                                    Send Reset Email
                                </button>
                            </div>
                            {message && (
                                <div className='new-error-message text danger mb-1'>
                                    {message}
                                </div>
                            )}
                        </form>
                        <div className='new-account-bottom'>
                            <span className='new-account-message'>
                                Remembered your password?
                                <a href="/login" className='new-signup-link' style={{ color: 'black' }}>Log in</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;