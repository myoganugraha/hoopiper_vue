import axios from 'axios';

let instance;

instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

const apiInstance = instance;

export default apiInstance;