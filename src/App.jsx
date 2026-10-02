import React, { useContext, useEffect, useState } from 'react';

import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';

import { AuthContext } from './context/AuthProvider';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const [authData] = useContext(AuthContext);

  useEffect(() => {
    const savedLogin = localStorage.getItem('loggedInUser');

    if (savedLogin) {
      try {
        const parsedLogin = JSON.parse(savedLogin);

        setUser(parsedLogin.role);
        setLoggedInUserData(parsedLogin.data || null);
      } catch {
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogin = (email, password) => {
    if (!authData) {
      alert('Please wait. Data is loading.');
      return;
    }

    const { employees, admin } = authData;

    const matchedAdmin = admin.find(
      (item) => item.email === email && item.password === password
    );

    if (matchedAdmin) {
      setUser('admin');
      setLoggedInUserData(null);

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ role: 'admin' })
      );

      return;
    }

    const employee = employees.find(
      (item) => item.email === email && item.password === password
    );

    if (employee) {
      setUser('employee');
      setLoggedInUserData(employee);

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({
          role: 'employee',
          data: employee
        })
      );

      return;
    }

    alert('Invalid Credentials');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setLoggedInUserData(null);
  };

  return (
    <>
    <h1 className="font-extrabold py-5 px-5 text-xl text-center  ">
            Employee Management System
          </h1>
      {!user && (
        <>
          

          <Login handleLogin={handleLogin} />

          
        </>
      )}

      {user === 'admin' && (
        <AdminDashboard changeUser={handleLogout} />
      )}

      {user === 'employee' && loggedInUserData && (
        <EmployeeDashboard
          changeUser={handleLogout}
          data={loggedInUserData}
        />
      )}
      <h1 className="font-extrabold py-5 px-5 text-xl text-center">
            Made By Mohit Chaubey @ 2026 
          </h1>
    </>
  );
};

export default App;


