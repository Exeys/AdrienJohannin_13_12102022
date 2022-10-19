import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Index from './views/Index/Index.js'
import Signin from './views/Signin/Signin';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Index />}>

          </Route>
          <Route path='/signin' element={<Signin />}>
            
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
