import * as React from 'react';

import {
    useState,
    useEffect,
    createElement,
    FunctionComponent,
    ReactNode} 
    from 'react';

import { RankingsView } from '../dto/industry-dtos';
import { useParams } from 'react-router';
import { getRankingsView } from '../services/industry-client';

import ReactTable from "react-table";

interface RankingState {
    rankingData: RankingsView,
    loading: boolean,
    notFound: boolean
}


export const RankingPage: FunctionComponent = (): any => {
    let{ name } = useParams();

    const [state, setState] = useState<RankingState>({
        rankingData: {
            industry: "",
            dateUpdated: "",
            rankings: [],
            bestBuy: {
                name: "",
                ticker: ""
            }
        },
        loading: true,
        notFound: false
    });

    const styles: React.CSSProperties = {
        display: 'inline-block',
        margin: '30px',
        textAlign: 'center',
        width: '100%'
    };


    function getRanking(industryName: string) {
        getRankingsView(name as string)
        .then(data => setState({
            rankingData: data,
            loading: false,
            notFound: false
        }))
        .catch(e => {
            setState({
                rankingData: state.rankingData,
                loading: false,
                notFound: true
            });
            console.log(e);
        });
    }
    
    useEffect(() => {
        if(!state.loading) {
            return;
        } else {
            getRanking(name as string);
        }
    })

    if(state.loading) {
        return (
            <React.Fragment>
                <h2>Loading...</h2>
            </React.Fragment>
        )
    } else if(state.notFound) {
        <h1>{`Ranking not found for industry ${name}`}</h1>
    } else {
        return (
            <div>
                <h1>{`${name} Rankings and Recommendations`}</h1>
                <div style={styles}>
                    <h2>Best Buy</h2>
                    <span style={{color: 'green', marginBottom: '50px'}}>
                        {`${state.rankingData.bestBuy.name} (${state.rankingData.bestBuy.ticker})`}
                    </span>
                    <h2>Data</h2>
                    <ReactTable
                        data={state.rankingData.rankings}
                        columns={[
                            {
                                Header: "Company",
                                accessor: "companyName.name"
                            },
                            {
                                Header: "Average Ranking",
                                accessor: "averageRanking"
                            },
                            {
                                Header: "P/E",
                                accessor: "pe"
                            },
                            {
                                Header: "Buy Rating",
                                accessor: "recommendation.buyRating"
                            },
                            {
                                Header: "Recommendation",
                                accessor: "recommendation.action"
                            }
                        ]}
                        showPagination={false}
                    />
                </div>
            </div>
        );
    }
    

}