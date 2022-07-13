import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import { publicRoutes, authRoutes } from '../router';
import { useSelector } from 'react-redux';

const AppRouter = () => {
    const auth = useSelector(state => state.login.auth);
    return (
        <div className="App">
            <Sidebar />
            <Routes>
                {auth
                    ?
                    authRoutes.map(route =>
                        <Route {...route} />
                    )
                    :
                    publicRoutes.map(route =>
                        <Route {...route} />

                    )}

                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </div>
    );
}

export default AppRouter;