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


interface TableState {
    data: IndustryProps[],
    loading: boolean
}

export const IndustryList: FunctionComponent = (): any => {
    const [tableState, setTableState] = useState({ data: [], loading: true } as TableState)

    function fetchData(): void {
        getAllIndustries()
            .then((industries) => setTableState({ data: industries, loading: false }));
    }

    return (
        <div style={{width: '45%'}}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Industries
            </h2>
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
                            cellInfo.value.map((industry: IndustryProps) => industry.name).join()
                        )
                    },
                    {
                        Header: "Date Updated",
                        accessor: "dateUpdated"
                    }
                    ]
                }
                defaultSorted={[
                    {
                        id: "dateUpdated",
                        desc: true
                    }
                ]}
            />
        </div>
    )
}