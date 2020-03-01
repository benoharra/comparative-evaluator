import { AxiosError } from 'axios';
import { string } from 'prop-types';

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

export const mapToObject = function (inputMap: Map<string, number>) {
    const mapObject: {[key: string]: number} = {};
    inputMap.forEach((val: number, key: string) => {
        mapObject[key] = val;
    });
    return mapObject;
}

export const objectToMap = function(inputObject: {[key: string]: number}) {
    const objectMap = new Map<string, number>();
    Object.keys(inputObject).forEach(key => {
        objectMap.set(key, inputObject[key]);
    });
    return objectMap;
}