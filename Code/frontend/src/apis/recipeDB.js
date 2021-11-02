import axios from 'axios';

export default axios.create({
    baseURL: 'http://##serverIp##:5000/api/v1'
})