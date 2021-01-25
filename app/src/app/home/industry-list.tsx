import * as React from 'react';
import {
    createElement,
    FunctionComponent,
    useState
} from 'react';

import ReactTable from "react-table";
import { CellInfo } from "react-table";
import { Link, useHistory } from 'react-router-dom';
import { IndustryProps } from '../dto/industry-dtos';
import { getAllIndustries } from '../services/industry-client';


interface TableState {
    data: IndustryProps[],
    loading: boolean
}

export const IndustryList: FunctionComponent = (): any => {

    const history = useHistory();
    const [tableState, setTableState] = useState({ data: [], loading: true } as TableState)

    function fetchData(): void {
        getAllIndustries()
            .then((industries) => setTableState({ data: industries, loading: false }));
    }

    function newAnalysisClicked(): void {
        history.push("/industry/new");
    }

    function getIndustryId(industryName: string): string {
        const industry = tableState.data.find(industry => industry.name === industryName);
        if(industry) {
            return industry.id;
        } else {
            console.error('Industry ID not found, routing to new...');
            return 'new';
        }
    }

    return (
        <div style={{width: '45%'}}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Industries
            </h2>
            <ReactTable
                data={tableState.data}
                loading={tableState.loading}
                defaultPageSize={10}
                onFetchData={() => fetchData()}
                columns={
                    [{
                        Header: "Industry",
                        accessor: "name",
                        Cell: (cellInfo: CellInfo) => (
                            <Link to={`/industry/${getIndustryId(cellInfo.value)}`}>
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
            <button style={{alignContent: 'right', marginTop: '5px', padding: '10px'}} onClick={newAnalysisClicked}>New Analysis</button>
        </div>
    )
}