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
import { MigratedPage } from './admin/migrated';


export const App: FunctionComponent = function() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>  
        <Route path="/industry/:id" component={IndustryPage}/>
        <Route path="/ranking/:id" component={RankingPage}/>
        <Route path="/admin/migrate" component={MigratedPage}/>
      </Switch>
    </Router>
  );
};