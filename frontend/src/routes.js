import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import Profile from './assets/pages/Profile';
import NewIncident from './assets/pages/NewIncident';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} /> 
                <Route path="/profile" component={Profile} /> 
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>            
        </BrowserRouter>
    );
}

