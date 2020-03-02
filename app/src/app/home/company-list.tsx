import * as React from 'react';
import {
    createElement,
    FunctionComponent,
    useState
} from 'react';

import ReactTable from "react-table";
import { CellInfo } from "react-table";
import { CompanyInfo } from '../dto/company-dtos';
import { Link } from 'react-router-dom';
import { getAllCompanies } from '../services/company-client';

interface TableState {
    data: CompanyInfo[],
    loading: boolean
}

export const CompanyList: FunctionComponent = (): any => {
    const [tableState, setTableState] = useState({ data: [], loading: true } as TableState);

    function fetchData(): void {
        getAllCompanies()
            .then((companies) => setTableState({ data: companies, loading: false }));
    }

    return (
        <div style={{ width: '45%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Companies
            </h2>
            <ReactTable
                data={tableState.data}
                loading={tableState.loading}
                onFetchData={(state, instance) => fetchData()}
                columns={
                    [{
                        Header: "Company",
                        accessor: "companyName",
                        Cell: (cellInfo: CellInfo) => (
                            `${cellInfo.value.name} (${cellInfo.value.ticker})`
                        )
                    },
                    {
                        Header: "Analyzed in:",
                        accessor: "industries",
                        Cell: (cellInfo: CellInfo) => (
                            // Split the industry names into a comma separated list of links
                            cellInfo.value.map((industry: string, i: number) =>
                                [
                                    i > 0 && ", ",
                                    <Link to="/industry">
                                        {industry}
                                    </Link>
                                ]  
                            )
                        )

                    },
                    {
                        Header: "",
                        Cell: (cellInfo: CellInfo) => (
                            <button>View Details</button>
                        )
                    }]
                }
                defaultSorted={[
                    {
                        id: "companyName.name",
                        desc: false
                    }
                ]}
            />
        </div>
    )
}