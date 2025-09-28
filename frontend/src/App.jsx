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
import ActionRoom from './pages/ActionRoom';

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-user" element={<ListUser />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/winner-list" element={<WinnerList />} />
        <Route path="/" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/auction-room/:id" element={<ActionRoom />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
