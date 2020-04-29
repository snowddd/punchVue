import axios from 'axios';
import apiconfig from '../config/apiconfig';

export default {
   async sendRequest(url,data) {
    return axios.post(`${apiconfig.apiConfig.host}/${url}`, data)
        }        
 }
