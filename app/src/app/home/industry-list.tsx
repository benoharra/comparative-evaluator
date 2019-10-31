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
import { CompanyList } from './company-list';


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
                    Cell: (cellInfo: CellInfo) => (
                        <Link to="/industry">
                            {cellInfo.value}
                        </Link>
                    )
                },
                {
                    Header: "Companies",
                    accessor: "companies",
                    Cell: (cellInfo: CellInfo) => (
                        <div>
                            {cellInfo.value.slice(0, Math.min(3, cellInfo.value.length)).join()
                            .concat(cellInfo.value.length > 3 ? "..." : "")}
                        </div>
                    )
                },
                {
                    Header: "Date Updated",
                    accessor: "dateUpdated"
                }

                ]
            }
        />
    )
}