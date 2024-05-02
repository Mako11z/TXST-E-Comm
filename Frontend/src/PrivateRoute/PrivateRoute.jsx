import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({children}) => {

        const{user,loading} = useContext(AuthContext)
        const location = useLocation();

        if(loading){
                return(
                    <div>Loading......</div>
                )
        }
        if(user){

            return children;
        }

        return (

                <Navigate to="/login" state = {{from: location}} replace> </Navigate>
        )


}  

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
    export default PrivateRoute