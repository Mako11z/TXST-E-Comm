import React from 'react'
import { Link } from 'react-router-dom';
// created under components because it is a shared component

const title = "About 9Commerce";
const desc = "Welcome to Texas State University, home of the Bobcats! Join our spirited community for an unforgettable academic adventure!";
const ItemTitle = "Categories";
const quickTitle = "Quick Links";
const tweetTitle = "Recent Tweets";

const addressList = [
    {
        iconName: 'icofont-google-map',
        text: ' San Marcos, Texas',
    },
    {
        iconName: 'icofont-phone',
        text: ' +512 771 1378',
    },
    {
        iconName: 'icofont-envelope',
        text: ' info@ReactShop.com',
    },
]

const socialList = [
    {
        iconName: 'icofont-facebook',
        siteLink: '#',
        className: 'facebook',
    },
    {
        iconName: 'icofont-twitter',
        siteLink: '#',
        className: 'twitter',
    },
    {
        iconName: 'icofont-linkedin',
        siteLink: '#',
        className: 'linkedin',
    },
    {
        iconName: 'icofont-instagram',
        siteLink: '#',
        className: 'instagram',
    },
    {
        iconName: 'icofont-pinterest',
        siteLink: '#',
        className: 'pinterest',
    },
]

const ItemList = [
    {
        text: 'All Products',
        link: '/shop',
    },
    {
        text: 'Shop',
        link: '/shop',
    },
    {
        text: 'Blog',
        link: '/blog',
    },
    {
        text: 'About',
        link: '/about',
    },
    {
        text: 'Policy',
        link: '#',
    },
    {
        text: 'FAQs',
        link: '/about',
    }
]

const quickList = [
    {
        text: 'Summer Sessions',
        link: '#',
    },
    {
        text: 'Events',
        link: '#',
    },
    {
        text: 'Gallery',
        link: '#',
    },
    {
        text: 'Forums',
        link: '#',
    },
    {
        text: 'Privacy Policy',
        link: '#',
    },
    {
        text: 'Terms of Use',
        link: '#',
    },
]

const footerbottomList = [
    {
        text: 'Faculty',
        link: '#',
    },
    {
        text: 'Staff',
        link: '#',
    },
    {
        text: 'Students',
        link: '#',
    },
    {
        text: 'Alumni',
        link: '#',
    },
]
const Footer = () => {
  return (
    <footer className='style-2'>
        <div className='footer-top dark-view padding-tb'>
            <div className='container'>
                <div className='row g-3 row-cols-xl-3 row-cols-sm-2 row-cols-1 justify-content-center'>
                    <div className='col'>
                        <div className='footer-item our-address'>
                            <div className='footer-inner'>
                                <div className='title'>
                                    <h4>{title}</h4>
                                </div>
                                <div className='content'>
                                    <p>{desc}</p>
                                    <ul className='lab-ul office-address'>
                                        {
                                            addressList.map((val, i) => (
                                                <li key={i}>
                                                    <i className={val.iconName}>{val.text}</i>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                    <ul className='lab-ul social-icons'>
                                        {
                                            socialList.map((val, i) => (
                                                <li key={i}>
                                                    <a href="#" className={val.className}><i className={val.iconName}>{val.text}</i></a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='footer-item our-address'>
                            <div className='footer-inner'>
                                <div className='title'>
                                    <h4>{quickTitle}</h4>
                                </div>
                                <div className='content'>
                                    <ul className='lab-ul office-address'>
                                        {
                                            quickList.map((val, i) => (
                                                <li key={i}>
                                                    <a href='#'>{val.text}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='footer-item our-address'>
                            <div className='footer-inner'>
                                <div className='title'>
                                    <h4>{ItemTitle}</h4>
                                </div>
                                <div className='content'>
                                    <ul className='lab-ul office-address'>
                                        {
                                            ItemList.map((val, i) => (
                                                <li key={i}>
                                                    <a href='#'>{val.text}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/** footer bottom content */}
        <div className='footer-bottom'>
            <div className='container'>
                <div className='section-wrapper'>
                    <p>&copy; 2024 Designed by: 
                        <a href='https://jayceturambe.vercel.app/' target="_blank">Jayce Turambe</a>, 
                        <a href='https://github.com/LetsGetRemixed' target="_blank">Colby Person</a>, 
                        <a href='https://github.com/Mako11z' target="_blank">Isaiah Gage</a>.
                        All rights reserved.
                    </p>

                    <div className='footer-bottom-list'>
                        {
                            footerbottomList.map((val, i) => (
                                <a href='#' key={i}>{val.text}</a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
