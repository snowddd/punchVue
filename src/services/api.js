import axios from 'axios';
import apiconfig from '../config/apiconfig';

export default {
   async sendRequest(url,data) {
    return axios.post(`${apiconfig.apiConfig.host}/${url}`, data)
        },    

        // login(email,password) {
        //     let user = {email: email, password: password}
        //     return axios.post("/login", user)
        // }

        
 }
