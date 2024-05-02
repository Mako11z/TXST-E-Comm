import React from 'react';
import { Link } from 'react-router-dom';

const title = "Join Our Global Community of Shoppers";

const desc = "With our app, shopping is accessible to everyone, including international students. Buy products on any device, anywhere in the world, and enjoy the convenience of our platform. Download and install our app today to start shopping!";


const clientsList = [
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'From Canada',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'Join us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'Join Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'Join Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'From Rwanda',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'Join Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'education thumb rajibraj91 rajibraj',
        text: 'Join Us',
    },
]

const Location = () => {
  return (
    <div className='clients-section style-2 padding-tb'>
      <div className='container'>
        <div className='section-header text-center'>
            <h2 className='title'>{title}</h2>
            <p>{desc}</p>
        </div>

        {/**main contents */}
        <div className='section-wrapper'>
            <div className='clients'>
                {
                    clientsList.map((val, i) => (
                        <div key={i} className='client-list'>
                            <Link to="sign-up" className="client-content">
                                <span>{val.text}</span>
                            </Link>
                            <div className='client-thumb'>
                                <img src={val.imgUrl} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

      </div>
    </div>
  )
}

export default Location
