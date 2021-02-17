import axios from 'axios';

require('dotenv').config({path: __dirname + '/../.env'});

export const riotInstance = axios.create( {
    baseURL: 'https://na1.api.riotgames.com/lol',
    params: {api_key: process.env.API_KEY},
});
