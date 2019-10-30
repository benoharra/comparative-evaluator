import * as React from 'react';

import {
    createElement,
    FunctionComponent,
    ReactNode,
} from 'react';

import ReactTable from "react-table";

import { Column, CellInfo } from "react-table";


import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';

import { Industry } from './../sector/industry';
import { testCompanies, testIndustries, CompanyProps, IndustryProps } from './../sector/data-mocker';
import { IndustryLink } from './industry-link';


interface Props {

}

export const IndustryList: FunctionComponent<Props> = (props: Props): any => {
    const industries: IndustryProps[] = testIndustries;


    return (
        <ReactTable
            data={testIndustries}
            columns={
                [{
                    Header: "Industry",
                    accessor: "name",
                    Cell: (cellInfo: CellInfo) => <IndustryLink value={cellInfo.value}/>
                },
                // {
                //     Header: "Companies",
                //     accessor: "companies",
                //     Cell: (cellInfo: CellInfo) => <p>TestCompanyList</p>
                // },
                {
                    Header: "Date Updated",
                    accessor: "updated"
                }

                ]
            }
        />
    )
}