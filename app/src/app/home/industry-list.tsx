import * as React from 'react';
import {
    createElement,
    FunctionComponent
} from 'react';

import ReactTable from "react-table";
import { CellInfo } from "react-table";
import { Link, useHistory } from 'react-router-dom';
import { IndustryProps } from '../dto/industry-dtos';
import { deleteAnalysis } from '../services/industry-client';


interface TableProps {
    data: IndustryProps[],
    getIndustryByName: (name: string) => IndustryProps | undefined,
    refreshData: () => void
}

export const IndustryList: FunctionComponent<TableProps> = (props): any => {

    const history = useHistory();

    function newAnalysisClicked(): void {
        history.push("/industry/new");
    }

    function getIndustryId(industryName: string): string {
        const industry = props.getIndustryByName(industryName);
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
                data={props.data}
                defaultPageSize={10}
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
                    },
                    {                    
                        Cell: (cellInfo: CellInfo) => (
                            <button 
                                onClick={() => {
                                    deleteAnalysis(cellInfo.original.id)
                                    .then(props.refreshData);
                                }} >
                                    Delete
                            </button>
                        )
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