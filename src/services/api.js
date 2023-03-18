import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
})