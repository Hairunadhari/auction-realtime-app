import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import ListUser from './pages/ListUser';
import Auctions from './pages/Auctions';
import WinnerList from './pages/WinnerList';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import { Toaster } from "react-hot-toast";

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/list-user" element={<ListUser />} />
        <Route exact path="/auctions" element={<Auctions />} />
        <Route exact path="/winner-list" element={<WinnerList />} />
        <Route exact path="/" element={<SignInForm />} />
        <Route exact path="/sign-up" element={<SignUpForm />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
