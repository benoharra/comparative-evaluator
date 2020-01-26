
import * as React from 'react';

import {
  useState,
  useEffect,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import { SectorInput } from './sector-input';
import { testCompanies, defaultWeights, CompanyProps } from './data-mocker';
import { useParams } from 'react-router';

import { getIndustryView } from './../services/industry-client';


interface State {
  industryName: string,
  companies: CompanyProps[],
  weights: Map<string, number>
  loading: boolean
}

export const Industry: FunctionComponent = function() {
  let { name } = useParams();
  const [state, setState] = useState<State>({
    industryName: "",
    companies: [],
    weights: new Map(),
    loading: true
  });

  function getIndustry(name: string) {
    getIndustryView(name)
    .then(industryView => setState({
      industryName: industryView.industry.name,
      companies: industryView.industry.companies,
      weights: industryView.industry.weights,
      loading: false
    }))
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    if(!state.loading) {
      return;
    }
    if(name && name !== "new") {
      getIndustry(name);
    } else {
        setState({
          industryName: "New Analysis",
          companies: testCompanies,
          weights: defaultWeights,
          loading: false
        });
    }
  })

  
  if(state.loading) {
    return (
      <Fragment>
        <h2>Loading...</h2>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h1>Add/Edit a sector</h1>
        <h2>{`Viewing ${name}`}</h2>
        <SectorInput 
          companyList={state.companies} 
          weights={state.weights} />
      </Fragment>
    );
  }

};