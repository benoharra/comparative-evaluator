import { AxiosError } from 'axios';

export const handleErrorArray = function (error: AxiosError) {
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