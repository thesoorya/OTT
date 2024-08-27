import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './components/Store/AuthUser';

const App = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <Routes>
        <Route path='/register' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
