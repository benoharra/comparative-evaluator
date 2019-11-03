import axios from 'axios';

import { CompanyInfo } from './../dto/server-dtos';
import { handleErrorArray } from './client-utils';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/company',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
});

export const getAllCompanies = async function() {
    return await axiosClient.get('/all')
        .then(function(response): CompanyInfo[] {
            return response.data as CompanyInfo[];
        })
        .catch(handleErrorArray) as CompanyInfo[];
}