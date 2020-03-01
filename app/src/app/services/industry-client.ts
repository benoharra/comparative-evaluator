import axios from 'axios';

import { IndustryProps, IndustryView, RankingsView, IndustryServerDto, IndustryViewServerDto } from '../dto/industry-dtos';
import { CompanyName } from '../dto/company-dtos';
import { handleErrorArray, objectToMap, mapToObject } from './client-utils';

const axiosConfig = {
    baseURL: 'http://localhost:8080/comp-eval/industry',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
};

const axiosClient = axios.create(axiosConfig);

export async function getAllIndustries()  {
    return axiosClient.get<IndustryProps[]>('/all') 
        .then(response => response.data)
        .catch(handleErrorArray);
}

export async function getIndustryView(industryName: string): Promise<IndustryView> {
    return await axios.get<IndustryViewServerDto>('/view', {
        params: {
            name: industryName
        },
        ...axiosConfig
    })
    .then(response => {
        const serverDto = response.data;
        const serverIndustry = serverDto.industry;
        return <IndustryView>{
            industry: {
                name: serverIndustry.name,
                companies: serverIndustry.companies,
                dateUpdated: serverIndustry.dateUpdated,
                weights: objectToMap(serverIndustry.weights)
            },
            rankings: serverDto.rankings
        };
    });
}

export async function saveIndustryData(
    name: string,
    companies: CompanyName[],
    companyFactors: Map<string, number>,
    weights: Map<string, number>) 
{
    return await axios.post('/save', 
    {
        name: name,
        companies: companies,
        companyFactors: mapToObject(companyFactors),
        weights: mapToObject(weights)
    },
    axiosConfig)
    .then(() => true)
    .catch(e =>{
        console.log(e);
        return false;
    })
}

export async function rankIndustry(
    name: string,
    companies: CompanyName[],
    companyFactors: any,
    weights: Map<string, number>) 
{
    return axios.post<RankingsView>('/analyze', {
        data: {
            name: name,
            companies: companies,
            companyFactors: companyFactors,
            weights: weights
        },
        ...axiosConfig
    }).then(response => response.data)
    .catch(e => {
        console.log(e);
        return null;
    })
}