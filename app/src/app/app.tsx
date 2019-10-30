import * as React from 'react';

import './app.css';
import {
  useState,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom';

import { HomePage } from './home/home-page';
import { Industry } from './sector/industry';



export const App: FunctionComponent = function() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>  
        <Route path="/industry" component={Industry}/>
      </Switch>
    </Router>
  
  );
};