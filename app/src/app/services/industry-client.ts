import axios, { AxiosError } from 'axios';

import { IndustryProps } from './../dto/server-dtos';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/industry',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
})

export const getAllIndustries = async function()  {
    return await axiosClient.get('/all') 
        .then(function (response): IndustryProps[] {
            return response.data as IndustryProps[];
        })
        .catch(handleError) as IndustryProps[];
}

const handleError = function (error: AxiosError) {
    if (error.response) {
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('General Request Error', error.message);
    }
    return [];
}



