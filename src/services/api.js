import axios from 'axios';

export default axios.create({
    baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
})

//http://localhost:3001