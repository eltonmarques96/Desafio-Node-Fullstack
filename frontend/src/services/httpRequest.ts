import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
