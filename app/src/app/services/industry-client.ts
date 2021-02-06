import axios from 'axios';

import { IndustryProps, IndustryView, RankingsView, IndustryServerDto, IndustryViewServerDto } from '../dto/industry-dtos';
import { CompanyName } from '../dto/company-dtos';
import { handleErrorArray, objectToMap, mapToObject } from './client-utils';

const axiosConfig = {
    baseURL: 'http://localhost:8080/comp-eval/industry',
    timeout: 10000,
    headers: {
        'Content-Type':'application/json'
    }
};

const axiosClient = axios.create(axiosConfig);

export async function getAllIndustries()  {
    return axiosClient.get<IndustryProps[]>('/all') 
        .then(response => response.data)
        .catch(handleErrorArray);
}

export async function getIndustryView(industryId: string): Promise<IndustryView> {
    return await axios.get<IndustryViewServerDto>('/view', {
        params: {
            id: industryId
        },
        ...axiosConfig
    })
    .then(response => {
        const serverDto = response.data;
        const serverIndustry = serverDto.industry;
        return <IndustryView>{
            industry: {
                id: serverIndustry.id,
                name: serverIndustry.name,
                companies: serverIndustry.companies,
                dateUpdated: serverIndustry.dateUpdated,
                weights: objectToMap(serverIndustry.weights)
            }
        };
    });
}

export async function getRankingsView(industryId: string): Promise<RankingsView> {
    return await axios.get<RankingsView>('/ranking', {
        params: {
            id: industryId
        },
        ...axiosConfig
    })
    .then(response => {
        return response.data;
    });
}

export async function saveIndustryData(
    name: string,
    companies: CompanyName[],
    companyFactors: Map<string, number>,
    weights: Map<string, number>,
    id?: string) : Promise<IndustryServerDto | null>
{
    return await axios.post<IndustryServerDto>('/save', 
    {
        id: id,
        name: name,
        companies: companies,
        companyFactors: mapToObject(companyFactors),
        weights: mapToObject(weights)
    },
    axiosConfig)
    .then(response => response.data)
    .catch(e =>{
        console.log(e);
        return null;
    })
}

export async function rankIndustryData(
    name: string,
    companies: CompanyName[],
    companyFactors: Map<string, number>,
    weights: Map<string, number>,
    id?: string) 
{
    return axios.post<RankingsView>('/analyze',
     {
        id: id,
        name: name,
        companies: companies,
        companyFactors: mapToObject(companyFactors),
        weights: mapToObject(weights)
    },
    axiosConfig);
}

export async function deleteAnalysis(analysisId: string) {
    return await axios.delete('/delete', {
        params: {
            id: analysisId
        },
        ...axiosConfig
    })
    .catch(e => console.log(e))
}