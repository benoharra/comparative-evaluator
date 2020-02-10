import * as React from 'react';

import { createElement,
         FunctionComponent,
         useState,
        } from 'react';
import { CompanyProps } from './data-mocker'
import { getSectorColumns } from './sector-columns';
import { buildSectorRowData } from './sector-row-data';
import { blankCompany } from './data-mocker';
import { TotalWeight } from './input/total-weight';

import ReactTable from "react-table";

import "react-table/react-table.css";

interface Props {
    companyList: CompanyProps[];
    weights: Map<string, number>;
}

export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    var companies = props.companyList;
    var weights = props.weights;
    const [tableColumns, setTableColumns] = useState(
        getSectorColumns(
            props.companyList,
             addColumn, 
             removeColumn,
             onWeightChange));

    const [tableData, setTableData] = useState(
        buildSectorRowData(companies, weights));

    function addColumn() {
        companies.push(blankCompany);
        setTableColumns(
            getSectorColumns(
                companies, 
                addColumn, 
                removeColumn,
                onWeightChange));
    }

    function removeColumn(companyName: string) {
        companies = companies.filter((company: CompanyProps) => company.name !== companyName);
        setTableColumns(
            getSectorColumns(
                companies, 
                addColumn, 
                removeColumn,
                onWeightChange));
    }

    function onWeightChange(factor: string, value: number) {
        // TODO: Weight sums not adding up anymore
        weights.set(factor, value);
        setTableData(buildSectorRowData(companies, weights));
    }

    function getTotalWeight(): number {
        return [...weights]
        .map(item => item[1])
        .reduce((sum: number, value: number) => sum + value);
    }

    function saveIndustry() {

    }

    function rankIndustry() {

    }

    return (
        <div style={{padding: '10px'}}>
            <ReactTable
                data={tableData}
                columns={tableColumns}
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