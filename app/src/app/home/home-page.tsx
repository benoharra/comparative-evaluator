import * as React from 'react';

import {
    createElement,
    FunctionComponent} 
    from 'react';

import { IndustryList } from './industry-list';
import { CompanyList } from './company-list';


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