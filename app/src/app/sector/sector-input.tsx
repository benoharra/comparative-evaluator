import * as React from 'react';

import { createElement,
         FunctionComponent,
         ReactNode 
        } from 'react';
import { CompanyProps } from './data-mocker'
import { getSectorColumns } from './sector-columns';
import { buildSectorRowData } from './sector-row-data';

import ReactTable from "react-table";
import "react-table/react-table.css";

interface Props {
    companyList: CompanyProps[];
}

export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    const tableData = buildSectorRowData(props.companyList);
    const tableColumns = getSectorColumns(props.companyList);
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