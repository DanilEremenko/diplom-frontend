import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PasswordRecovery from './pages/PasswordRecovery';
import Dashboard from './pages/Dashboard';
import RegistrationPage from './pages/Registration';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';

const App = () => {
    // 👇 Проверка авторизации (можно усложнить потом)
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* 👇 Защищённый маршрут */}
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
