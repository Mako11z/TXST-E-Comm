import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import PageHeader from '../components/PageHeader';
import GoogleMap from '../components/GoogleMap';

const subTitle = "Contact Us";
const title = "We Value Your Feedback!";
const conSubTitle = "Contact Information";
const conTitle = "Please Fill Out the Form Below to Get in Touch With Us.";
const btnText = "Send Message";

const contactList = [
    {
        imgUrl: "/images/icons/01.png",
        imgAlt: "contact icon",
        title: "School Address",
        desc: "601 University Dr, San Marcos, TX 78666",
    },
    {
        imgUrl: "/images/icons/02.png",
        imgAlt: "contact icon",
        title: "Phone number",
        desc: "+5127711378",
    },
    {
        imgUrl: "/images/icons/03.png",
        imgAlt: "contact icon",
        title: "Send email",
        desc: "team9cs4398@gmail.com",
    },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://commerce-app-stripeserver.onrender.com/send-email', formData);
      console.log(response.data);
      // Reset form after successful submission if needed
      if (response.data.success){
        alert("Sent!");
        setFormData({
            name: '',
            email: '',
            number: '',
            subject: '',
            message: ''
        });
        }else{
            alert("Something went wrong");
        }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
        <PageHeader title={"Get In Touch With Us"} curPage={"Contact Us"}/>
        <div className='map-address-section padding-tb section-bg'>

            {/* Your contact information */}
            <div className="container">
                <div className='section-header text-center'>
                    <span className='subtitle'>{subTitle}</span>
                    <h2 className='title'>{title}</h2>
                </div>

                <div className='section-wrapper'>
                    <div className='row flex-row-reverse'>
                        <div className='col-xl-4 col-lg-5 col-12'>
                            <div className='contact-wrapper'>
                                {contactList.map((val, i) => (
                                    <div key={i} className='contact-item'>
                                        <div className='contact-thumb'>
                                            <img src={val.imgUrl} alt={val.imgAlt} />
                                        </div>
                                        <div className='contact-content'>
                                            <h4>{val.title}</h4>
                                            <p>{val.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/**google map */}
                        <div className='col-xl-8 col-lg-7 col-12'>
                            <GoogleMap />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='contact-section padding-tb'>
            <div className='container'>
                <div className='section-header text-center'>
                    <span className='subtitle'>{conSubTitle}</span>
                    <h2 className='title'>{conTitle}</h2>
                </div>

                <div className='section-wrapper'>
                    <form className='contact-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input type='text' name="name" id="name" placeholder='Your Name' value={formData.name} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type='email' name="email" id="email" placeholder='Your email' value={formData.email} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type='number' name="number" id="number" placeholder='Phone Number' value={formData.number} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <input type='text' name="subject" id="subject" placeholder='Subject' value={formData.subject} onChange={handleChange} />
                        </div>

                        <div className='form-group w-100'>
                            <textarea name="message" id="message" rows="8" placeholder='Your message' value={formData.message} onChange={handleChange}></textarea>
                        </div>

                        <div className='form-group w-100 text-center'>
                            <button className="lab-btn" type="submit">
                                <span>{btnText}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact;
