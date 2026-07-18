import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Builder } from './pages/Builder';
import { JDWorkspacePage } from './pages/JDWorkspacePage';
import { ToastContainer } from './components/layout/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/builder" 
              element={
                <AuthGuard>
                  <Builder />
                </AuthGuard>
              } 
            />
            <Route 
              path="/jd-workspace" 
              element={
                <AuthGuard>
                  <JDWorkspacePage />
                </AuthGuard>
              } 
            />
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/builder" replace />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
