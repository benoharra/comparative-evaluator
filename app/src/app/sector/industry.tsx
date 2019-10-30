import * as React from 'react';

import {
  useState,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import { SectorInput } from './sector-input';
import { testCompanies, CompanyProps } from './data-mocker';

export const Industry: FunctionComponent = function() {
  const companies: CompanyProps[] = testCompanies;

  return (
    <Fragment>
      <h1>Add/Edit a sector</h1>
      <h2>Test Sector - hard coded data</h2>
      <SectorInput companyList={companies} />
    </Fragment>
  );
};