import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Index from './views/Index/Index.js'
import Signin from './views/Signin/Signin.js';
import User from './views/User/User.js';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';

function App() {
  return (
    <React.Fragment>

      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Index />}>

          </Route>
          <Route path='/signin' element={<Signin />}>

          </Route>
          <Route path='/user' element={<User />}>

          </Route>
        </Routes>
        <Footer />
      </Router>

    </React.Fragment>
  );
}

export default App;
