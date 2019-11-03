import * as React from 'react';

import {
    createElement,
    FunctionComponent,
    ReactNode,
} from 'react';

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';

import { Industry } from './../sector/industry';
import { IndustryList } from './industry-list';
import { CompanyList } from './company-list';
import { testCompanies, CompanyProps } from './../sector/data-mocker';


interface Props {

}

export const HomePage: FunctionComponent<Props> = (props: Props): any => {

    const styles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '10px'
    };


    return (
            <div>
                <h1>Welcome to the Comparative Evaluator!</h1>
                <div style={styles}>
                    <IndustryList />
                    <CompanyList />
                </div>
                
            </div>
    )
}