import * as React from 'react';

import { createElement,
         FunctionComponent,
         useState,
        } from 'react';
import { CompanyProps } from './data-mocker'
import { getSectorColumns } from './sector-columns';
import { RowData, buildSectorRowData } from './sector-row-data';
import { blankCompany } from './data-mocker';
import { TotalWeight } from './input/total-weight';

import ReactTable from "react-table";

import "react-table/react-table.css";
import { saveIndustryData } from '../services/industry-client';
import { CompanyList } from '../home/company-list';
import { UpdatedDataPoint } from './input/cell/factor';
import { string } from 'prop-types';

interface Props {
    companyList: CompanyProps[];
    weights: Map<string, number>;
    industryName: string;
}


export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    const [tableColumns, setTableColumns] = useState(
        {
            companies: props.companyList,
            columns: getSectorColumns(
                props.companyList,
                 addColumn, 
                 removeColumn,
                 onWeightChange,
                 onUpdateData)
        });

    const [tableData, setTableData] = useState(
        {
            companyData: buildSectorRowData(
                props.companyList, 
                props.weights,
                new Map()),
            weights: props.weights,
            dataUpdates: new Map<string, Map<string, any>>()
        });

    function addColumn() {
        tableColumns.companies.push(blankCompany);
        setTableColumns({
            companies: tableColumns.companies,
            columns: getSectorColumns(
                tableColumns.companies, 
                addColumn, 
                removeColumn,
                onWeightChange,
                onUpdateData)
        });
    }

    function removeColumn(companyName: string) {
        tableColumns.companies = tableColumns.companies.filter((company: CompanyProps) => company.name !== companyName);
        setTableColumns({
            companies: tableColumns.companies,
            columns: getSectorColumns(
                tableColumns.companies, 
                addColumn, 
                removeColumn,
                onWeightChange,
                onUpdateData)
        });
    }

    function onWeightChange(factor: string, value: number) {
        tableData.weights.set(factor, value);
        setTableData({
            companyData: buildSectorRowData(
                tableColumns.companies, 
                tableData.weights,
                tableData.dataUpdates),
            weights: tableData.weights,
            dataUpdates: tableData.dataUpdates});
    }

    function getTotalWeight(): number {
        return [...tableData.weights]
        .map(item => item[1])
        .reduce((sum: number, value: number) => sum + value);
    }

    function onUpdateData(updatedDataPoint: UpdatedDataPoint) {
        const newDataUpdates = tableData.dataUpdates;
        const row: Map<string, any> = newDataUpdates.has(updatedDataPoint.rowLabel) ? 
            newDataUpdates.get(updatedDataPoint.rowLabel) as Map<string, any>
            : new Map<string, any>();
        row.set(updatedDataPoint.ticker, updatedDataPoint.newValue);
        newDataUpdates.set(updatedDataPoint.rowLabel, row);
        setTableData({
            companyData: buildSectorRowData(
                tableColumns.companies,
                tableData.weights,
                newDataUpdates
            ),
            weights: tableData.weights,
            dataUpdates: newDataUpdates});
    }

    function saveIndustry() {
        saveIndustryData(
            props.industryName,
            tableColumns.companies.map(company => ({name: company.name, ticker: company.ticker})),
            tableData.companyData,
            tableData.weights);
    }

    function rankIndustry() {

    }

    return (
        <div style={{padding: '10px'}}>
            <ReactTable
                data={tableData.companyData}
                columns={tableColumns.columns}
                defaultPageSize = {20}
                sortable={false}
                showPagination={false}
            />
            <div style={{flexDirection: 'column', float: 'right'}}>
                <TotalWeight total={getTotalWeight()}/>
                <div style={{flexDirection: 'row', 
                    padding: '10px 20px 10px 10px'}}>
                    <button onClick={e => saveIndustry()} style={{padding:'10px', margin: '10px'}}>
                        Save Industry
                    </button>
                    <button onClick={e => rankIndustry()} style={{padding: '10px'}}>
                        Submit For Ranking
                    </button>
                </div>
            </div>

        </div>
    );
};