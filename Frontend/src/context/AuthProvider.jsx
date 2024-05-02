import React, {useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { createContext } from 'react';
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthContext = createContext();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);

    //create user here!!!!!
    const createUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }

    //login
    const login = (email, password) => {
            setLoading(true);
            return signInWithEmailAndPassword(auth, email, password)
    }
      //logout funct
      const logOut = () => {

          return signOut(auth)
      }

        //user is avalible or nah
        useEffect(() =>{
              const unsubscribe = onAuthStateChanged(auth, currentuser =>{
                  setUser(currentuser);
                  setProfilePic(user?.photoURL);
                  setLoading(false);
              })
                return () =>{
                      return unsubscribe();

                }
        },[])


    const authInfo = {
        user,
        loading,
        profilePic,
        createUser,
        signUpWithGmail,
        login,
        logOut
    }

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider
