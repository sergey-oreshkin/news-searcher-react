import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Header from './components/Header';
import { APP_TITLE } from './utils/constants';
import ModalWrapper from './components/ModalWrapper';
import SearchPage from './pages/SearchPage';



const App = () => {

  return (
    <div className='m-auto font-mono max-w-screen-lg px-3'>
      <ModalWrapper />
      <Header title={APP_TITLE} />
      <Routes>
        <Route path='/' element={<SearchPage />} />
      </Routes>
    </div>
  )
}

export default App;