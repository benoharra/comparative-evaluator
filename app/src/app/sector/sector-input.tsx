import * as React from 'react';

import { createElement,
         FunctionComponent,
         ReactNode, 
         useState
        } from 'react';
import { CompanyProps } from './data-mocker'
import { getSectorColumns } from './sector-columns';
import { buildSectorRowData } from './sector-row-data';

import { Column } from 'react-table';

import ReactTable from "react-table";
import "react-table/react-table.css";

interface Props {
    companyList: CompanyProps[];
}

export const SectorInput: FunctionComponent<Props> = (props: Props): any => {
    const [tableData, setTableData] = useState(buildSectorRowData(props.companyList));

    // Columns will be state controlled in the future as well
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