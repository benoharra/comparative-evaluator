import * as React from 'react';

import { FunctionComponent, ReactNode, createElement } from 'react';

import { Column, CellInfo } from "react-table";

import { CompanyProps } from './data-mocker';

import { Factor } from './input/factor';

import { RowData } from './sector-row-data';



export const getSectorColumns = function(
    companyList: CompanyProps[]
    //tableData: RowData[]
): any {
    let columns: any[] = [{Header: "", accessor: "label"}];
    companyList.forEach(
        (company: CompanyProps) => 
        columns.push({
            Header: `${company.name} (${company.ticker})`,
            accessor: company.ticker,
            minWidth: 140,
            Cell: (cellInfo: CellInfo) => <Factor value={cellInfo.value}/>
        }));
    columns.push({
        Header: "Weight",
        accessor: "weight"
    });
    return columns;
};