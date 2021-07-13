import axios from 'axios';
import { httpURL } from './helpers/base_url';

const http = axios.create({
    baseURL: httpURL,
    headers: {
        'Content-Type':'application/json'
    }
});

export default http;