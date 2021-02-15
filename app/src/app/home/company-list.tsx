import * as React from 'react';
import {
    createElement,
    FunctionComponent
} from 'react';

import ReactTable from "react-table";
import { CellInfo } from "react-table";
import { CompanyInfo } from '../dto/company-dtos';
import { Link } from 'react-router-dom';
import { IndustryProps } from '../dto/industry-dtos';

interface CompanyListProps{
    data: CompanyInfo[],
    getIndustryByName: (name: string) => IndustryProps | undefined
}

export const CompanyList: FunctionComponent<CompanyListProps> = (props): any => {

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
        <div style={{ width: '45%' }}>
            <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Companies
            </h2>
            <ReactTable
                data={props.data}
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
                                    <Link to={`/industry/${getIndustryId(industry)}`}>
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