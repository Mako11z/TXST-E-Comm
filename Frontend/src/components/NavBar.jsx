import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../src/assets/images/logo/logo.png";
import { AuthContext } from '../context/AuthProvider';
import '../customcss/Nav.css';
import { AiOutlineLogout } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { useEffect } from 'react';
import axios from 'axios';

const NavBar = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };
    
    //authinfo
    const {user, logOut, profilePic} = useContext(AuthContext)
    console.log(user);

    useEffect(() => {
      console.log('compoment mounted');
      if (user) {
        checkAdmin(user.email);
      }
    }, [user]);

    const checkAdmin = async (email) => {
      axios.get(`https://commerce-app-adminserver.onrender.com/users/admin/${email}`)
      .then(res => {
          console.log(res.data.admin);
          setIsAdmin(res.data.admin);
      })
      .catch(error => {
          console.error('Error checking if admin', error);
      })
  }

    
    //Add event listener
    window.addEventListener("scroll", () => {
        if(window.scrollY > 200){
            setHeaderFixed(true);
        }else{
            setHeaderFixed(false)
        }
    })


    const handleLogout = async () => {
        try {
          await logOut();
          console.log("Logged out successfully");
        } catch (error) {
          console.error("Failed to log out", error);
        }
      };
      
    

  return (
    <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
      {/* header top start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className='container'>
            <div className='header-top-area'>
                <Link to="/signup" className='lab-btn me-3'><span>Create Account</span></Link>
                <Link to="login">Log in</Link>
            </div>
        </div>
      </div>

      {/* header bottom */}
      <div className='header-bottom'>
        <div className='container'>
            <div className='header-wrapper'>
                {/* logo here */}
                <div className='logo-search-acte'>
                     <div className='logo' style={{ display: 'flex', alignItems: 'center' }}>
                         <Link to={"/"}>
                             <img src={logo} style={{width: '100px', height: '100px'}} />
                         </Link>
                                 <h1 style={{ marginLeft: '-25px', color: '#ffd700', fontWeight: 'bold', fontSize: '52px', margin: '0' }}>
                                      Commerce
                                 </h1>
                     </div>
                </div>
                {/* menu area. */}
                <div className='menu-area'>
                    <div className='menu'>
                        <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/sign-up">Create Account</Link></li>
                        

                        </ul>
                    </div>
        {/* SINGUP OR LOGIN ||  SHOPPING CART AND LOGOUT*/}
        {user ? (
                 <div className="user-panel" onClick={toggleDropdown}>
                  {/** If a user has a photo it will be displayed otherwise the default icon will show up. */}
                 {user.photoURL ? 
                  <img className="navbar-profile-pic" alt="profilePicture" src={user.photoURL}/> :
                  <img src={profilePic || '/images/clients/avater.jpg'} alt="Profile" className="navbar-profile-pic" />
                 }
                 <div className="menu-icon">
                   <span></span>
                   <span></span>
                   <span></span>
                 </div>
                 {dropdownOpen && (
                  <div className={`dropdown-content ${dropdownOpen ? "show" : ""}`}>
                    <Link to="/cart-page"><GiShoppingCart />Cart</Link> 
                    {isAdmin === true && <Link to="/dashboard"><MdDashboard />Dashboard</Link>}
                    <button onClick={handleLogout}><AiOutlineLogout />Logout</button>
                  </div>
                 )}
               </div>
              ) : (
                <div>
                   
                  <Link to="/login" className='lab-btn d-none d-md-block'>Log In</Link>

                </div>
            
              )}

                    {/* menu toggler this will set hamburger memu on small screens and navbar on larger ones!*/}
                    <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* social toggler */}
                    <div className='ellepsis-bar d-md-none' onClick={() => setSocialToggle(!socialToggle)}>
                    <i className="icofont-info-square"></i>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
