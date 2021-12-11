import axios from 'axios'

const COMMENT_BASE_REST_API_URL = 'http://localhost:8090/comment/';

class CommentsService{

    makeComment(comment){
        return axios.post(COMMENT_BASE_REST_API_URL, comment);
    }

    getAnimalComment(animalId){
        return axios.get(COMMENT_BASE_REST_API_URL + animalId);
    }

    getAllComments(){
        return axios.get(COMMENT_BASE_REST_API_URL);
    }

}

export default new CommentsService();