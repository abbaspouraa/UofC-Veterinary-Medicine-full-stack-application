import axios from 'axios'

const COMMENT_BASE_REST_API_URL = 'http://localhost:8090/comment/';

class CommentsService{

    makeComment(ucid, pass, comment){
        return axios.post(COMMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass, comment);
    }

    getAnimalComment(ucid, pass, animalId){
        return axios.get(COMMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass + '/' + animalId);
    }

    getAllComments(ucid, pass){
        return axios.get(COMMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass);
    }

}

export default new CommentsService();