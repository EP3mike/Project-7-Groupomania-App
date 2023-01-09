//helps access data for logged in users
//uses axios to make http req to api
import axios from 'axios';
import authHeader from './auth-header';

//logged in users api 
const API_URL = 'http://localhost:8080/api/auth/user/';

class UserService {
    //get account info by id http req
    getUserById(userId) {
        return axios.get(API_URL + `${userId}`, { headers: authHeader() });
    }
    //modify account info
    updateUser(data, userId) {
        return axios.put(API_URL + `${userId}`, data , { headers: authHeader() });
    }
    //delete post by id http req
    deleteUser(userId) {
        return axios.delete(API_URL + `${userId}`, { headers: authHeader() });
    }

}

export default new UserService();