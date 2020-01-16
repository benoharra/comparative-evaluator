import axios from 'axios';

import { CompanyInfo } from '../dto/company-dtos';
import { handleErrorArray } from './client-utils';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/company',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
});

export async function getAllCompanies() {
    return await axiosClient.get<CompanyInfo[]>('/all')
        .then(function(response): CompanyInfo[] {
            return response.data;
        })
        .catch(handleErrorArray);
}