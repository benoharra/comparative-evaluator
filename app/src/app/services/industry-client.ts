import axios, { AxiosError, AxiosResponse } from 'axios';

import { IndustryProps } from './../dto/server-dtos';
import { any } from 'prop-types';


const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/industry',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
})

export const getAllIndustries = async function()  {
    return await axiosClient.get('/all') 
        .then(function (response): IndustryProps[] {
            console.log("ya!");
            return response.data as IndustryProps[];
        })
        .catch(handleError) as IndustryProps[];
}

const handleError = function (error: AxiosError) {
    console.log('Request Error!!!!!!!!!!!!!!');
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



