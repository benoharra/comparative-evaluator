import axios from 'axios';

import { IndustryProps } from './../dto/server-dtos';
import { handleErrorArray } from './client-utils';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/industry',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
});

export const getAllIndustries = async function()  {
    return await axiosClient.get('/all') 
        .then(function (response): IndustryProps[] {
            return response.data as IndustryProps[];
        })
        .catch(handleErrorArray) as IndustryProps[];
}