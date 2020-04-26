import React from 'react';
import './App.css';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Meeting from './Meeting';
import AddMeeting from './addMeeting';


function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/" exact component={Meeting} />
        <Route path='/add-meeting' exact component={AddMeeting} />
      </Switch>
    </Router>
  );
}

export default App;
