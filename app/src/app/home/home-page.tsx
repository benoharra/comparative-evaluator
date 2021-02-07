import * as React from 'react';

import {
    createElement,
    FunctionComponent,
    useState,
    useEffect
} 
    from 'react';

import { IndustryList } from './industry-list';
import { CompanyList } from './company-list';
import { IndustryProps } from '../dto/industry-dtos';
import { getAllIndustries } from '../services/industry-client';
import { CompanyInfo } from '../dto/company-dtos';
import { getAllCompanies } from '../services/company-client';


interface Props {

}

interface HomePageState {
    loading: boolean,
    industryData: IndustryProps[],
    companyData: CompanyInfo[]
}

export const HomePage: FunctionComponent<Props> = (props: Props): any => {

    const [homePageState, setHomePageState] = useState({
        loading: true,
        industryData: [],
        companyData: []
    } as HomePageState)
    
    const styles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '10px'
    };

    useEffect(() => {
        if(!homePageState.loading) {
            return;
        } else {
            getAllData();
        }
    })

    function getAllData(): void {
        getAllIndustries()
            .then((industries) => {
                getAllCompanies()
                    .then((companies) => {
                        setHomePageState({
                            companyData: companies,
                            industryData: industries,
                            loading: false
                        })
                    })
            })
    }

    function getIndustryByName(industryName: string): IndustryProps | undefined {
        return homePageState.industryData.find(industry => industry.name === industryName);
    }


    return homePageState.loading ? (
        <React.Fragment>
                <h2>Loading...</h2>
        </React.Fragment>)
     :   (
            <div>
                <h1>Welcome to the Comparative Evaluator!</h1>
                <div style={styles}>
                    <IndustryList
                        data={homePageState.industryData}
                        getIndustryByName={getIndustryByName}
                        refreshData={getAllData}
                     />
                    <CompanyList 
                        data={homePageState.companyData}
                        getIndustryByName={getIndustryByName}
                    />
                </div> 
            </div>
    )
}