import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import './index.css'
import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { Signup } from './pages/Signup.tsx'; 
import { SignupLinkSent } from './pages/SignupLinkSent.tsx';
import { CreatePassword } from './pages/CreatePassword.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './components/AuthProvider.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { Create } from './pages/Create.tsx';
import { Profile } from './pages/Profile.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/confirmation" element={<SignupLinkSent />}/>
          <Route path="/createpassword/:token" element={<CreatePassword/>}/>
          <Route path="/dashboard" element={<Navigate to="/dashboard/hot"/>} /> 
          <Route path="/dashboard/hot" element={
          <ProtectedRoute redirectTo="/"> <Dashboard variant="hot"/> </ProtectedRoute>} /> 
          <Route path="/dashboard/new" element={
          <ProtectedRoute redirectTo="/"> <Dashboard variant="new"/> </ProtectedRoute>} /> 
          <Route path="/create" element={
          <ProtectedRoute redirectTo="/"> <Create/> </ProtectedRoute>} /> 
          <Route path="/profile" element={
          <ProtectedRoute redirectTo="/"> <Profile/> </ProtectedRoute>} /> 
            
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
