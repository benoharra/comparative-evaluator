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
import { IndustryPage } from './sector/industry-page';
import { RankingPage } from './ranking/ranking-page';


export const App: FunctionComponent = function() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>  
        <Route path="/industry/:name" component={IndustryPage}/>
        <Route path="/ranking/:name" component={RankingPage}/>
      </Switch>
    </Router>
  );
};