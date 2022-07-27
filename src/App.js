import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';
import AppRouter from './components/AppRouter';
import { checkToken } from './store/API/LoginApi';

const App = () => {
  const dispatcher = useDispatch();

  // eslint-disable-next-line
  useEffect(() => { dispatcher(checkToken()) }, []);

  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
