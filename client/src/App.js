import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Index from './views/Index/Index.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Index />}>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
