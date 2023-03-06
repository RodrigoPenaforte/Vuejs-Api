import axios from 'axios';

//MINHA URL API: https://rickandmortyapi.com/api/character
const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/character'
});

export default api;