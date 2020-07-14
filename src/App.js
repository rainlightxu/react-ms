import React from 'react';
import {BrowserRouter,HashRouter,Switch,Route} from 'react-router-dom'

import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
