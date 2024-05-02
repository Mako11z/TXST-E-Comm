import React from 'react';
import PageHeader from '../components/PageHeader';


const subTitle = "About Our Ecommerce Platform";
const title = "High-Quality Products and Exceptional Shopping Experiences";
const desc = "At our ecommerce platform, we are committed to delivering unparalleled products and seamless shopping experiences. Our transparent processes and efficient functionalities ensure satisfaction at every turn. Leveraging cutting-edge technology, we provide a cross-platform solution that elevates the overall shopping experience.";

const year = "Over 3 Years";
const experience = "of Web-App Experience";

const aboutList = [
    {
        imgUrl: '/about/icon/01.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Expert in Web App Development',
        desc: 'We are a team of three highly skilled developers specializing in web application development. With our expertise and experience, we offer top-notch implementation to give you your dream web app.',       
    },
    {
        imgUrl: '/about/icon/02.png',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Leaders in Tech Innovation',
        desc: "In addition to our proficiency in web app development, we are proud graduates of Texas State University, slated to earn our degrees in May 2024. Armed with a stack of modern technologies in our toolkit, we are poised to revolutionize the tech industry. Our relentless pursuit of innovation and unwavering commitment to excellence make us an ideal partner for those seeking groundbreaking digital solutions.",
    },
    {
        imgUrl: '/about/icon/03.jpg',
        imgAlt: 'about icon rajibraj91 rajibraj',
        title: 'Get in Touch with Us Online',
        desc: "Connect with us online, and let's collaborate to develop pioneering web applications. Our team is dedicated to transforming your ideas into impactful digital solutions, bringing your vision to life.",
    },
    
];

const About = () => {
    return (
        <div>
            <PageHeader title={"About our Team"} curPage={"About"}/>
            <div className='about-section style-4 py-12 bg-gray-100'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                        {/* First Column */}
                        <div className='flex flex-col items-center md:text-center'>
                            <div className='mb-8'>
                                <img src="/about/Jayce.png" style={{ width: "300px", height: "300px", borderRadius: "50%" }} alt="" className="img-fluid"/>
                            </div>
                            <div className='mb-8 flex flex-wrap justify-center md:justify-start'>
                                <img src="/about/colby.png" style={{ width: "300px", height: "300px", borderRadius: "50%" }} alt="" className="img-fluid mr-4 mb-4"/>
                                <img src="/about/Isaiah.png" style={{ width: "300px", height: "300px", borderRadius: "50%" }} alt="" className="img-fluid ml-4 mb-4"/>
                            </div>
                            <div className='text-center'>
                                <h3 className='mb-2'>{year}</h3>
                                <p>{experience}</p>
                            </div>
                        </div>

                        {/* Second Column. */}
                        <div className=''>
                            <div className='section-header'>
                                <span className='text-lg'>{subTitle}</span>
                                <h2 className='text-3xl mb-4'>{title}</h2>
                                <p>{desc}</p>
                            </div>

                            <div className='section-wrapper'>
                                <ul className='lab-ul'>
                                    {
                                        aboutList.map((val, i) => (
                                            <li key={i} className='flex items-center mb-4'>
                                                <div className='sr-left mr-4'>
                                                    <img src={val.imgUrl} alt={val.imgAlt} style={{ width: "200px", height: "80px" }} />
                                                </div>
                                                <div className='sr-right'>
                                                    <h5>{val.title}</h5>
                                                    <p>{val.desc}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                    
                                    {/** links to the programmer's social links */}
                                    <span className='inline-block mr-2'>
                                        <a 
                                            href="https://jayceturambe.vercel.app/" 
                                            target="_blank" 
                                            className='text-green-500 hover:text-blue-500 transition duration-300'
                                        >
                                            @Jayce Turambe,
                                        </a>
                                    </span>

                                    <span className='inline-block mr-2'>
                                        <a 
                                            href="https://github.com/LetsGetRemixed" 
                                            target="_blank" 
                                            className='text-green-500 hover:text-blue-500 transition duration-300'
                                        >
                                            @Colby Person,
                                        </a>
                                    </span>

                                    <span className='inline-block'>
                                        <a 
                                            href="https://github.com/Mako11z" 
                                            target="_blank" 
                                            className='text-green-500 hover:text-blue-500 transition duration-300'
                                        >
                                            @Isaiah Gage
                                        </a>
                                    </span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
