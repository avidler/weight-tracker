import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';

import Login from './pages/Login'
import User from './pages/User'

function App() {
  return (
    <div className="App">
        <Switch>
        <Route exact path="/">
                    <Login />
        </Route>
        <Route exact path="/user">
                    <User />
        </Route>

        </Switch>
    </div>
  );
}

export default App;
