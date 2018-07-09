import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './callback/callback';
import Auth from './auth/auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    
    <Router history={history}>
      <div>
        <Route path="/" exact component={(props) => <App auth={auth} {...props} />} />
        <Route path="/home" exact component={(props) => <App auth={auth} {...props} />} />
        <Route path="/building" exact component={(props) => <App auth={auth} {...props} />} />
        <Route path="/bridge" exact component={(props) => <App auth={auth} {...props} />} />
        <Route path="/historical-building" exact component={(props) => <App auth={auth} {...props} />} />
        <Route path="/callback" exact component={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}