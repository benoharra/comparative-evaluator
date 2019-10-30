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
import { testCompanies, CompanyProps } from './../sector/data-mocker';


interface Props {

}

export const HomePage: FunctionComponent<Props> = (props: Props): any => {
    const companies: CompanyProps[] = testCompanies;


    return (
            <div>
                <h1>Welcome to the Comparative Evaluator!</h1>

                <Link to="/industry">
                    Industry Data
                </Link>
            </div>


    
    )
}