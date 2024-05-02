import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaRegUser, FaLocationArrow} from "react-icons/fa6";
import { FaSitemap } from "react-icons/fa";
import { SiContactlesspayment } from "react-icons/si";
import { GrHome } from "react-icons/gr";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import logo from "../assets/images/logo/logo.png";

const DashLayout = () => {
  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here...*/}
          <div className='flex items-center justify-between mx-4'>
            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><MdOutlineDashboardCustomize /></label>
            {/* <button className="btn rounded-full px-6 flex items-center gap-2 text-white sm:hidden" style={{ backgroundColor: '#2fd700' }}><FaRegUser /> Logout</button> */}

          </div>
    
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet/>
          </div>
  
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li className="flex items-center">
              <h2 className="text-green-600 font-bold text-xl">
                <img src={logo} className="w-12 h-12" alt="Logo" />
                <span className="ml-2">Commerce</span>
                <span className="badge badge-primary ml-2">Admin</span>
              </h2>
              <h4 className="flex items-center"><MdDashboard className="mr-2" /> Dashboard</h4>
            </li>

            <hr/>

            <li> <Link to="/dashboard/users"><FaUsers /> All users</Link></li>
            <li> <Link to="/dashboard/orders"><SiContactlesspayment /> Orders & Payment </Link></li>
            <li> <Link to="/dashboard/manageItem"><FaSitemap /> Manage Inventory</Link></li>
            <li> <Link to="/"><GrHome /> Home</Link></li>
          </ul>
        
        </div>
      </div>
    </div>
  )
}

export default DashLayout
