import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { Signup } from './pages/Signup.tsx'; 
import { SignupLinkSent } from './pages/SignupLinkSent.tsx';
import { CreatePassword } from './pages/CreatePassword.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/confirmation" element={<SignupLinkSent />}/>
        <Route path="/createpassword/:token" element={<CreatePassword/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
