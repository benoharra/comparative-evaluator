
import * as React from 'react';

import {
  useState,
  useEffect,
  createElement, 
  FunctionComponent,
  Fragment} from 'react';

import { SectorInput } from './sector-input';
import { CompanyProps } from './../dto/company-dtos';
import { useParams } from 'react-router';

import { getIndustryView } from '../services/industry-client';
import { getBlankCompany, getDefaultWeights } from '../default-objects';


interface State {
  industryName: string,
  companies: CompanyProps[],
  weights: Map<string, number>
  loading: boolean
  isNew: boolean
  industryId?: string
}

export const IndustryPage: FunctionComponent = function() {
  let { id } = useParams();
  const [state, setState] = useState<State>({
    industryName: "",
    companies: [],
    weights: new Map(),
    loading: true,
    isNew: true
  });

  function getIndustry(id: string) {
    getIndustryView(id)
    .then(industryView => setState({
      industryName: industryView.industry.name,
      companies: industryView.industry.companies,
      weights: industryView.industry.weights,
      loading: false,
      isNew: false,
      industryId: industryView.industry.id
    }))
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    if(!state.loading) {
      return;
    }
    if(id && id !== "new") {
      getIndustry(id);
    } else {
        setState({
          industryName: "New Analysis",
          companies: [getBlankCompany(), getBlankCompany(1)],
          weights: getDefaultWeights(),
          loading: false,
          isNew: true
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
        <SectorInput 
          companyList={state.companies} 
          weights={state.weights} 
          industryName={state.industryName}
          isNew={state.isNew}
          industryId={state.industryId}/>
      </Fragment>
    );
  }

};