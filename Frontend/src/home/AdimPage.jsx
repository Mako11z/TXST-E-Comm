import React from 'react';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

const subTitle = "Why Choose Us";
const title = "Join and Learn How to Do Business";
const desc = "Learn the ins and outs of commerce on any device with our app. Gain knowledge and skills to become an effective eSeller. Download, install, and start learning today!";
const btnText = "Apply Now";


const countList = [
    {
        iconName: 'icofont-users-alt-4',
        count: '136',
        text: 'Registered Sellers',
    },
    {
        iconName: 'icofont-notification',
        count: '110',
        text: 'Rewards and GiftCards',
    },
]

const AdimPage = () => {
  return (
    <div className='instructor-section style-2 padding-tb section-bg-ash'>
        <div className='container'>
            <div className='section-wrapper'>
                <div className='row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-2 row-cols-xl-3'>
                    <div className='col'>
                        {
                            countList.map ((val, i) => (
                                <div key={i} className="count-item" >
                                    <div className="count-inner">
                                        <div className="count-icon">
                                            <i className={val.iconName}></i>
                                        </div>
                                        <div className='count-content'>
                                            <h2><span>
                                                <CountUp end={val.count} /></span>
                                                <span>+</span>
                                            </h2>
                                            <p>{val.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className='col'>
                        <div className='instructor-content'>
                            <span className='subTitle'>{subTitle}</span>
                            <h2 className='title'>{title}</h2>
                            <p>{desc}</p>
                            <Link to="sign-up" className='lab-btn'>{btnText}</Link>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='instructor-thumb'>
                            {/* <img src="/src/assets/images/instructor/01.png" alt="" /> */}
                            <img src="/src/assets/images/instructor/tx.jpg" alt="" style={{ borderRadius: '50%', width: '350px', height: '350px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default AdimPage
