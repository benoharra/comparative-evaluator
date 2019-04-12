import * as React from 'react';

import { FunctionComponent, ReactNode } from 'react';

import { Column } from "react-table";

import { CompanyProps } from './data-mocker'


export const getSectorColumns = function(
    companyList: CompanyProps[]
): any {
    let columns: any[] = [{Header: "", accessor: "label"}];
    companyList.forEach(
        (company: CompanyProps) => 
        columns.push({
            Header: `${company.name} (${company.ticker})`,
            accessor: company.ticker,
            minWidth: 140
        }));
    columns.push({
        Header: "Weight",
        accessor: "weight"
    });
    return columns;
};