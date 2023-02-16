import React, { useLayoutEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import { APP_TITLE, USERNAME_STORAGE_KEY } from './utils/constants';
import ModalWrapper from './components/ModalWrapper';
import SearchPage from './pages/SearchPage';
import { useDispatch } from 'react-redux';
import { check } from './store/api/loginApi';
import { AppDispatch } from './store';

const App = () => {

  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    const storedUserName = window.localStorage.getItem(USERNAME_STORAGE_KEY);
    if (Boolean(storedUserName))
      dispatch(check());
  }, []);

  return (
    <div className='m-auto font-mono max-w-screen-lg px-3'>
      <ModalWrapper />
      <Header title={APP_TITLE} />
      <Routes>
        <Route path='/' element={<SearchPage />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </div>
  )
}

export default App;