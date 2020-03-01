import * as React from 'react';
import { FunctionComponent, ReactNode, createElement } from 'react';

import { Column, CellInfo } from "react-table";

import { CompanyProps } from './data-mocker';

import { Factor, UpdatedDataPoint } from './input/cell/factor';
import { Weight } from './input/cell/weight';
import { CompanyNameHeader } from './input/cell/company-header';
import { RowHeader } from './input/cell/row-header';
import { AddCompanyButton } from './input/cell/add-company';


export const getSectorColumns = function(
    companyList: CompanyProps[],
    onUpdateColumns: () => void,
    onRemoveColumn: (companyName: string) => void,
    onWeightChange: (factor: string, newWeight: number) => void,
    onUpdateData: (updatedDataPoint: UpdatedDataPoint) => void,
    onUpdateCompanyName: (oldName: string, oldTicker: string, newName: string, newTicker: string) => void
): any {
    // Add the data header names to the first column
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
                            onUpdateName={onUpdateCompanyName} 
                          />,
            accessor: company.ticker,
            minWidth: 140,
            Cell: (cellInfo: CellInfo) => <Factor 
                                            value={cellInfo.value} 
                                            rowLabel={cellInfo.original}
                                            ticker={company.ticker}
                                            onValueUpdated={onUpdateData}
                                            />
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
                                        row={cellInfo.original} 
                                        onChange={onWeightChange}/>
    });
    return columns;
};
