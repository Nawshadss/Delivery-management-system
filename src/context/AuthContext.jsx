import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
export const AuthProvider = createContext(null);

const AuthContext = ({ children }) => {
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(false);
  const creatNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const gitSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const googleSignInPop = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const handlesignOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUserState(user);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    creatNewUser,
    gitSignIn,
    logInUser,
    googleSignInPop,
    userState,
    handlesignOut,
    loading,
    setLoading,
  };
  return (
    <div>
      <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
    </div>
  );
};

export default AuthContext;
