import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import _Sidebar from './components/Sidebar';
import { AllRoutes } from './routes';

function App () {
  return(
    <>
      <AllRoutes/>
    </>
  )
}

export default App;