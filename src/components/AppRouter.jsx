import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import { publicRoutes } from '../router';

const AppRouter = () => {
    return (
        <div className="App">
            <Sidebar />
            <Routes>
                {publicRoutes.map(route =>
                    <Route {...route} />
                )}
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default AppRouter;