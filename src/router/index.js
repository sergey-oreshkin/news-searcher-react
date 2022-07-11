import React from 'react';
import EditPage from '../pages/EditPage';
import MainPage from '../pages/MainPage';

export const publicRoutes = [
    {path: '/', exact: true, element: <MainPage/>, key:'/', text: 'Поиск'},
];

export const authRoutes = [
    {path: '/', exact: true, element: <MainPage />, key:'/', text: 'Поиск'},
    {path: '/edit', exact: true, element: <EditPage />, key: '/edit', text: 'Редактор RSS'}
];