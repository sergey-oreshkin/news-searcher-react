import React from 'react';

import Header from './components/Header';
import { APP_TITLE } from './utils/constants';
import ModalWrapper from './components/ModalWrapper';

const App = () => {

  return (
    <div className='m-auto font-mono max-w-screen-lg px-3'>
      <ModalWrapper />
      <Header title={APP_TITLE} />
    </div>
  )
}

export default App;