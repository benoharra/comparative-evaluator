import * as React from 'react';
import {
    createElement,
    FunctionComponent,
    useState
} from 'react';

import ReactTable from "react-table";
import { CellInfo } from "react-table";
import { Link } from 'react-router-dom';
import { IndustryProps } from './../dto/server-dtos';
import { getAllIndustries } from '../services/industry-client';


interface Props {

}

interface TableState {
    data: IndustryProps[],
    loading: boolean,
}

export const IndustryList: FunctionComponent<Props> = (props: Props): any => {
    const [tableState, setTableState] = useState({ data: [], loading: true } as TableState)

    function fetchData(): void {
        getAllIndustries()
            .then((industries) => setTableState({ data: industries, loading: false }));
    }

    return (
        <ReactTable
            data={tableState.data}
            loading={tableState.loading}
            onFetchData={(state, instance) => fetchData()}
            columns={
                [{
                    Header: "Industry",
                    accessor: "name",
                    Cell: (cellInfo: CellInfo) => (
                        <Link to="/industry">
                            {cellInfo.value}
                        </Link>
                    )
                },
                {
                    Header: "Companies",
                    accessor: "companies",
                    Cell: (cellInfo: CellInfo) => (
                        <div>
                            {cellInfo.value.slice(0, Math.min(3, cellInfo.value.length))
                                .map((industry: IndustryProps) => industry.name).join()
                                .concat(cellInfo.value.length > 3 ? "..." : "")}
                        </div>
                    )
                },
                {
                    Header: "Date Updated",
                    accessor: "dateUpdated"
                }
                ]
            }
        />
    )
}