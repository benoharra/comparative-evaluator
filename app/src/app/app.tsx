import * as React from 'react';

import './app.css';
import {
  useState,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import { SectorInput } from './sector/sector-input';
import { testCompanies, CompanyProps } from './sector/data-mocker';

export const App: FunctionComponent = function() {
  const companies: CompanyProps[] = testCompanies;

  return (
    <Fragment>
      <h1>Add/Edit a sector</h1>
      <h2>Test Sector - hard coded data</h2>
      <SectorInput companyList={companies} />
    </Fragment>
  );
};