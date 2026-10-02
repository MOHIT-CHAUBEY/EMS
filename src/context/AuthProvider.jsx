import React, { useState, useEffect, createContext } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLocalStorage();

    const { employees, admin } = getLocalStorage();

    setUserData({ employees, admin });
  }, []);

  useEffect(() => {
    if (userData !== null) {
      localStorage.setItem(
        'employees',
        JSON.stringify(userData.employees)
      );

      localStorage.setItem(
        'admin',
        JSON.stringify(userData.admin)
      );
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


