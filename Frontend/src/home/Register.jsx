import React from 'react'
import { Link } from 'react-router-dom';

const subTitleStyle = {
    fontSize: '3rem', 
    color: 'yellow',
  };
  const subTitle = (
    <span className="subtitle" style={subTitleStyle}>
      9 Commerce
    </span>
  );
const title = (<h2 className = 'title' style={{ color: 'black', marginRight: '100px' }}> Sign up now for 15% OFF your first purchase! </h2>)

const desc = "Limited Time Offer! Don't miss out on incredible savings!";

const Register = () => {

        return(
            <section className = 'register-section padding-tb pb-40'>
                <div className = 'container'>
                    <div className = 'row g-4 row-cols-lg-2 row-cols-1 align-items-center'>
                        <div className = 'col'>
                            <div className = 'section-header'>
                               <span style={{ color: 'black' }}> {subTitle}    </span>
                                         {title}
                                    <p style={{ color: 'black' }}>{desc}</p>
                            </div>
                        </div>


                             <div className = 'col'>
                                    <div className = 'section-wrapper'>
                                        <h4> Register Now </h4>
                                        <form className = 'register-form'>
                                                <input type = "text" name = 'name' placeholder = 'Username' className = 'reg-input' />
                                                <input type = "email" name = 'email' placeholder = 'Email' className = 'reg-input' />
                                                <input type = "number" name = 'number' placeholder = 'Phone' className = 'reg-input' />
                                                    <button type = 'submit' className = 'lab-btn'>
                                                        <Link to="sign-up">Register Now</Link>
                                                    </button>
                                        </form>
                                    </div>
                            </div>
                        </div>
                    </div>
            </section>

        )
}

export default Register