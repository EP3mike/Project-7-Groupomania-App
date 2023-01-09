// helps access data for posts from backend 
// axios http req to server api

import axios from 'axios';
import authHeader from './auth-header';

//posts api 
const API_URL = 'http://localhost:8080/api/posts/';

class PostService {
    //get all post http req
    getAllPosts() {
        return axios.get(API_URL  , { headers: authHeader() });
    }
    //get post by id http req
    getOnePost(postId) {
        return axios.get(API_URL + `${postId}`, { headers: authHeader() });
    }
    updatePostReaders(data, postId) {
        // console.log(authHeader());
        return axios.post(API_URL + `${postId}`, data ,{ headers: authHeader() });
    }
    //make a new post http req
    createPost(data) {
        // console.log(authHeader());
        return axios.post(API_URL, data ,{ headers: authHeader() });
    }
    //modify existing post http req
    updatePost(data, postId) {
        return axios.put(API_URL + `${postId}`, data ,{ headers: authHeader() });
    }
    //delete post by id http req
    deletePost(postId) {
        return axios.delete(API_URL + `${postId}`, { headers: authHeader() });
    }

}

export default new PostService();
