import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import '../customcss/Login.css';
import axios from 'axios';


const title = "Login";
const socialTitle = "OR";
const btnText = "Login Now";


const socialList = [{      iconName : 'icofont-facebook', siteLink: "#", className: "facebook", }, {iconName: 'icofont-twitter',
 siteLink: '#', className: 'twitter',}, {iconName : 'icofont-linkedin', siteLink: '#', className: 'linkedin',},{iconName: 'icofont-instagram',
 siteLink: '#', className: 'instagram',}, { iconName:
'icofont-pinterest', siteLink: '#', className: 'pinterest',},]

const Login = () => {

    const [errorMessage, seterrorMessage] = useState("");
    const {signUpWithGmail, login} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');

    const checkAdmin = async (email) => {
        axios.get(`https://commerce-app-adminserver.onrender.com/users/admin/${email}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.error('Error checking if admin', error);
        })
    }

    const handleLogin=(event) =>{
            event.preventDefault();
            const form = event.target;
            //console.log(form)
            const email = form.email.value;
            const password = form.password.value;
           // console.log(email, password)
           login(email, password).then((result) =>{
                const user = result.user;
                checkAdmin(email);
                alert("Login successful")
                navigate(from, {replace: true})
           }).catch((error) => {
                const errorMsg = error.message;
                // alert user to have valid credentials
                alert("Please provide valid email and password.")
           })
    }

    const handleRegister =(event) =>{
            event.preventDefault();
            signUpWithGmail().then((result) => {
                const user = result.user;
                const emailAddress = user.email;
                checkAdmin(emailAddress);
                navigate(from, {replace: true})
            }) .catch((error) => {
                const errorMsg = error.message;
                seterrorMessage("Please provide valid email and password.")
           })

    }

    return (
        <div>
            <NavBar/>
            <div className='new-login-section padding-tb section-bg'>
                <div className="new-container">
                    <div className="new-account-wrapper">
                        <h3 className="new-title">{title}</h3>
                        <form className='new-account-form' onSubmit={handleLogin}>
                            <div className='form-group'>
                                <input type="email" name="email" id="email" placeholder='Email Address *' required/>
                            </div>
                            <div className='form-group'>
                                <input type="password" name="password" id="password" placeholder='Password *' required/>
                            </div>
                            <div>
                                {/* showing message */}
                                {errorMessage && (
                                    <div className='new-error-message text danger mb-1'>
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className='form-group'>
                                <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                                    <div className='new-checkgroup'>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                    <Link to="/forgetpassword">Forget Password?</Link>
                                </div>
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='new-button'>
                                    <span>{btnText}</span>
                                </button>
                            </div>
                        </form>
                        <h5 className='new-subtitle'>{socialTitle}</h5>
                        <ul className='new-social-icons'>
                            <li>
                                <a href="/" className='google-btn' onClick={handleRegister}>
                                    <img src="/images/Google-button.png" 
                                         alt="Google" style={{verticalAlign: "middle"}}/>
                                    Sign in with Google
                                </a>
                            </li>
                        </ul>
                        <div className='new-account-bottom'>
                            <span className='new-account-message'>
                                Don't have an account?
                                <a href="/sign-up" className='new-signup-link' style={{ color: 'black' }}>Create Account</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}
        export default Login