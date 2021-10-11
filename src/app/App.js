import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import NavList from './components/navList';
import Home from './layouts/home';
import Login from './layouts/login';
import Users from "./layouts/users";

function App() {
  
    return (
        <>
        <NavList />
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/users/:userId?" component={Users} />
            <Route exact path="/" component={Home} />
            <Redirect to="/"/>                
        </Switch>
        </>
    );
}

export default App;
