import * as React from 'react';

import { createElement,
         FunctionComponent,
         ReactNode, 
         useState,
         useEffect
        } from 'react';
import { CompanyProps } from './data-mocker'
import { getSectorColumns } from './sector-columns';
import { buildSectorRowData } from './sector-row-data';
import { blankCompany } from './data-mocker';

import ReactTable from "react-table";

import { Column } from 'react-table';

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
        weights.set(factor, value);
        setTableData(buildSectorRowData(companies, weights));
    }

    return (
        <div>
            <ReactTable
                data={tableData}
                columns={tableColumns}
                defaultPageSize = {20}
                sortable={false}
            />
        </div>
    );
};