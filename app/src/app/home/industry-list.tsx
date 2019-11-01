import * as React from 'react';
import {
    createElement,
    FunctionComponent,
    useState,
    ReactNode,
} from 'react';

import usePromise from 'react-promise';
import ReactTable from "react-table";
import { Column, CellInfo } from "react-table";
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom';
import { testCompanies, testIndustries, CompanyProps } from './../sector/data-mocker';
import { IndustryProps } from './../dto/server-dtos';
import { getAllIndustries } from '../services/industry-client';


interface Props {

}

export const IndustryList: FunctionComponent<Props> = (props: Props): any => {
    const industryPromise = getAllIndustries();
    const { value, loading } = usePromise<IndustryProps[]>(industryPromise);

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <ReactTable
            data={value}
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
                            {cellInfo.value.slice(0, Math.min(3, cellInfo.value.length))
                                .map((industry: IndustryProps) => industry.name).join()
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