import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import 'swiper/css';

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// import fonts and icons
import './assets/css/icofont.min.css';
import './assets/css/animate.css';
import './assets/css/style.min.css';

import Home from './home/Home.jsx';
import StripeContainer from './shop/StripeContainer.jsx';
import Shop from './shop/Shop.jsx';
import About from './about/About.jsx';
import Contact from './contact/Contact.jsx';
import AuthProvider from './context/AuthProvider.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SingleProduct from './shop/SingleProduct.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Login from './components/Login.jsx';
import { Signup } from './components/Signup.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

import CartPage from './shop/CartPage.jsx';
import DashLayout from './home/DashLayout.jsx';
import Dashboard from './pages/dashboard/admin/Dashboard.jsx';
import Users from './pages/dashboard/admin/Users.jsx';
import DeleteItem from './components/DeleteItem.jsx'; 
import Orders from './pages/dashboard/admin/Orders.jsx';
import ManageItem from './pages/dashboard/admin/ManageItem.jsx';
import StripeModalContainer from './shop/StripeModalContainer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <Home/>},
      {
        path: "/shop",
        element: <PrivateRoute><Shop/></PrivateRoute>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <PrivateRoute><Contact/></PrivateRoute>
      },
      {
        path: "shop/:id",
        element: <SingleProduct />
      },
      
      {
        path: "cart-page",
        element: <PrivateRoute><CartPage/></PrivateRoute>
      },
      {
        path: "delete-item",
        element: <DeleteItem />
      },
      { path: '/pay/:orderTotal', 
        element: <StripeModalContainer />
      }
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/sign-up",
    element: <Signup/>
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword/>
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashLayout/></PrivateRoute>,
    children: [
      {
        path: "",
        element: <Dashboard/>
      },
      {
        path: "users",
        element: <Users/>
      },
      {
        path: "orders",
        element: <Orders/>
      },
      {
        path: "manageItem",
        element: <ManageItem/>
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
