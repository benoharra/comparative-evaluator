import axios from 'axios';
import { handleErrorArray } from './client-utils';


const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/comp-eval/admin',
    timeout: 10000,
    headers: {'Content-Type':'application/json'}
});

export async function migrate() {
    return await axiosClient.get('/migrateAll').catch(handleErrorArray)
}