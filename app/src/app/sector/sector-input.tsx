import * as React from 'react';

import { createElement,
         FunctionComponent,
         useState
        } from 'react';
import { CompanyProps } from './../dto/company-dtos';
import { IndustryName } from './input/industry-name';
import { getSectorColumns } from './sector-columns';
import { buildSectorRowData } from './sector-row-data';
import { blankCompany } from './input/data/data-defaults';
import { TotalWeight } from './total-weight';

import { useHistory } from 'react-router-dom';

import ReactTable from "react-table";

import "react-table/react-table.css";
import { saveIndustryData, rankIndustryData } from '../services/industry-client';
import { UpdatedDataPoint } from './input/cell/factor';
import { Constants } from './../constants';
import { getFactorKeyFromName } from '../config';

interface Props {
    companyList: CompanyProps[];
    weights: Map<string, number>;
    industryName: string;
    isNew: boolean;
    industryId?: string;
}


export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    const history = useHistory();
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
            dataUpdates: new Map<string, Map<string, any>>(),
            industryName: props.industryName,
            industryId: props.industryId
        });

    function addColumn() {
        tableColumns.companies.push({
            ...blankCompany,
            name: `${blankCompany.name}${tableColumns.companies.length}`,
            ticker: `${blankCompany.ticker}${tableColumns.companies.length}`
        });
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
        const newWeights = tableData.weights;
        newWeights.set(factor, value);
        setTableData({
            ...tableData,
            companyData: buildSectorRowData(
                tableColumns.companies, 
                tableData.weights,
                tableData.dataUpdates),
            weights: newWeights
        });
    }

    function getTotalWeight(): number {
        return [...tableData.weights]
        .map(item => item[1])
        .reduce((sum: number, value: number) => sum + value, 0);
    }

    function onUpdateData(updatedDataPoint: UpdatedDataPoint) {
        const newDataUpdates = tableData.dataUpdates;
        const row: Map<string, any> = newDataUpdates.has(updatedDataPoint.rowLabel) ? 
            newDataUpdates.get(updatedDataPoint.rowLabel) as Map<string, any>
            : new Map<string, any>();
        row.set(updatedDataPoint.ticker, updatedDataPoint.newValue);
        newDataUpdates.set(updatedDataPoint.rowLabel, row);
        setTableData({
            ...tableData,
            companyData: buildSectorRowData(
                tableColumns.companies,
                tableData.weights,
                newDataUpdates
            ),
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
                ...tableData,
                companyData: buildSectorRowData(
                    newCompanyList,
                    tableData.weights,
                    newDataUpdates
                ),
                dataUpdates: newDataUpdates});
        }
    }

    function onUpdateIndustryName(newName: string) {
        setTableData({
            ...tableData,
            industryName: newName
        });
    }

    function saveIndustry() {
        saveIndustryData(
            tableData.industryName,
            tableColumns.companies.map(company => ({name: company.name, ticker: company.ticker})),
            buildFactorMapToSubmit(),
            tableData.weights,
            props.industryId)
        .then(industry => 
            industry ?
                setTableData({
                    ...tableData,
                    industryId: industry.id
                })
                : console.log('Unabled to Save Industry...')
        );
    }

    function rankIndustry() {
        rankIndustryData(
            tableData.industryName,
            tableColumns.companies.map(company => ({name: company.name, ticker: company.ticker})),
            buildFactorMapToSubmit(),
            tableData.weights,
            tableData.industryId)
        .then(() => history.push(`/ranking/${tableData.industryId}`))
        .catch((e) => console.log(e));
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
        
        tableData.dataUpdates.forEach((updateRow, rowName) => {
            const rowKey = getFactorKeyFromName(rowName);
            updateRow.forEach((value, ticker) => {
                data.set(`${ticker}.${rowKey}`, parseFloat(value));
            });
        });
        
        return data;
    }

    return (
        <React.Fragment>
            <IndustryName 
                name={tableData.industryName} 
                isNew={props.isNew}
                onUpdateIndustryName={onUpdateIndustryName}/>
            <div style={{padding: '10px'}}>
                <ReactTable
                    data={tableData.companyData}
                    columns={tableColumns.columns}
                    defaultPageSize = {21}
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
                        <button 
                            onClick={e => rankIndustry()} 
                            style={{padding: '10px'}}
                            disabled={tableData.industryId === undefined}
                            >
                            Submit For Ranking
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
};