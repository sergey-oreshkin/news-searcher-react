import React from 'react';
import EditPage from '../pages/EditPage';
import MainPage from '../pages/MainPage';

export const publicRoutes = [
    {path: '', exact: true, element: <MainPage/>, key:'/'},
];

export const authRoutes = [
    {path: '/edit', exact: true, element: EditPage, key: '/edit'}
];