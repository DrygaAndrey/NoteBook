import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/authPage';
import MainPage from './pages/mainPage';


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path='/noteBook' element={<MainPage />} />
                <Route exact path='*' element={<Navigate to="/noteBook" />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path='/' element={<AuthPage />} />
            <Route exact path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}