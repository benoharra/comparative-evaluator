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

import { Column } from 'react-table';

import ReactTable from "react-table";
import "react-table/react-table.css";

interface Props {
    companyList: CompanyProps[];
}

export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    const tableData = buildSectorRowData(props.companyList);

    const [tableColumns, setTableColumns] = useState(getSectorColumns(props.companyList, addColumn, removeColumn));

    function addColumn() {
        props.companyList.push(blankCompany);
        setTableColumns(getSectorColumns(props.companyList, addColumn, removeColumn));
    }

    function removeColumn(companyName: string) {
        props.companyList = props.companyList.filter((company) => company.name !== companyName);
        setTableColumns(getSectorColumns(props.companyList, addColumn, removeColumn));
    }

    return (
        <div>
            <ReactTable
                data={tableData}
                columns={tableColumns}
                defaultPageSize = {20}
            />
        </div>
    );
};