import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerking-ba599.firebaseio.com/'
});

export default instance;