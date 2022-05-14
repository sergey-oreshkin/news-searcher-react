import React from 'react';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default App;