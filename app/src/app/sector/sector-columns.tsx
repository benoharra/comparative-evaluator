import * as React from 'react';

import { FunctionComponent, ReactNode, createElement } from 'react';

import { Column, CellInfo } from "react-table";

import { CompanyProps } from './data-mocker';

import { Factor } from './input/cell/factor';

import { Weight } from './input/cell/weight';

import { CompanyNameHeader } from './input/cell/company-header';

import { RowHeader } from './input/cell/row-header';

import { AddCompanyButton } from './input/cell/add-company';


const onWeightChange = function(newWeight: number) {

}

export const getSectorColumns = function(
    companyList: CompanyProps[],
    onUpdateColumns: () => void,
    onRemoveColumn: (companyName: string) => void
): any {
    let columns: any[] = [{
                            Header: "", 
                            accessor: "label",
                            Cell: (cellInfo: CellInfo) => <RowHeader value={cellInfo.value} rowName={cellInfo.original} />
                        }];

    // Add each company to the columns
    companyList.forEach(
        (company: CompanyProps) => 
        columns.push({
            Header: () => <CompanyNameHeader 
                            companyHeader={company}
                            onRemoveCompany={onRemoveColumn} 
                          />,
            accessor: company.ticker,
            minWidth: 140,
            Cell: (cellInfo: CellInfo) => <Factor value={cellInfo.value} rowLabel={cellInfo.original}/>
        }));

    // Add the add columns button
    columns.push({
        Header: () => <AddCompanyButton onAddCompany={onUpdateColumns}/>
    });

    columns.push({
        Header: "Weight",
        accessor: "weight",
        Cell: (cellInfo: CellInfo) => <Weight 
                                        value={cellInfo.value}
                                        rowLabel={cellInfo.original} 
                                        onChange={onWeightChange}/>
    });
    return columns;
};