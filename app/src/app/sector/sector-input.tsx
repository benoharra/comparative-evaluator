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
import { Constants } from './../constants';
import { getFactorKeyFromName } from '../config';
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
                 onUpdateData,
                 onUpdateCompanyName)
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
                onUpdateData,
                onUpdateCompanyName)
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
                onUpdateData,
                onUpdateCompanyName)
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

    function onUpdateCompanyName(oldName:string, oldTicker: string, newName: string, newTicker: string) {
        // Find the company in the list and adjust it
        const newCompanyIndex = tableColumns.companies
            .findIndex(company => company.name === oldName && company.ticker === oldTicker);
        const newCompany = tableColumns.companies[newCompanyIndex];
        newCompany.name = newName;
        newCompany.ticker = newTicker;
        const newCompanyList = tableColumns.companies;
        newCompanyList[newCompanyIndex] = newCompany;
        
        // Set the proper tables columns with the new data
        setTableColumns({
            companies: newCompanyList,
            columns: getSectorColumns(
                    newCompanyList, 
                    addColumn, 
                    removeColumn,
                    onWeightChange,
                    onUpdateData,
                    onUpdateCompanyName)});

        // Convert any old data keys to the new values
        if(oldTicker !== newTicker) {
            const newDataUpdates: Map<string, Map<string, any>> = new Map();
            tableData.dataUpdates.forEach((row, rowLabel, map) => {
                const newRow = new Map();
                row.forEach((value, valueTicker, map) => {
                    newRow.set(valueTicker === oldTicker ? newTicker : valueTicker,  value as number);
                });
                newDataUpdates.set(rowLabel, newRow);
            });
            setTableData({
                companyData: buildSectorRowData(
                    newCompanyList,
                    tableData.weights,
                    newDataUpdates
                ),
                weights: tableData.weights,
                dataUpdates: newDataUpdates});
        }
    }

    function saveIndustry() {
        saveIndustryData(
            props.industryName,
            tableColumns.companies.map(company => ({name: company.name, ticker: company.ticker})),
            buildFactorMapToSubmit(),
            tableData.weights);
    }

    function rankIndustry() {

    }

    function buildFactorMapToSubmit(): Map<string, number> {
        const data = new Map<string, number>();
        tableData.companyData
            .filter(row => !Constants.FACTOR_CATEGORIES.has(row.label))
            .forEach(row => {
                const rowKey = getFactorKeyFromName(row.label);
                for(let[ticker, value] of Object.entries(row)) {
                    if(ticker !== "weight" && ticker !== "label") {
                        data.set(
                            `${ticker}.${rowKey}`, 
                            value ? value as number : 0);
                    }
                }
            });
        
        return data;
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