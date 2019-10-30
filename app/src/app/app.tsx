import * as React from 'react';

import './app.css';
import {
  useState,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import { HomePage } from './home/home-page';

export const App: FunctionComponent = function() {

  return (
    <Fragment>
      <HomePage />
    </Fragment>
  );
};