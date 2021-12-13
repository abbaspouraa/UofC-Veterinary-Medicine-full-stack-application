import axios from 'axios'

const USER_BASE_REST_API_URL = 'http://localhost:8090/user/';

class UserService{

    getAllUsers(ucid, pass){
        return axios.get(USER_BASE_REST_API_URL + "getAll/" + ucid + '/' + pass);
    }

    searchUsers(ucid, pass, user){
        return axios.post(USER_BASE_REST_API_URL + ucid + '/' + pass, user)
    }

    deleteUser(ucid, pass, doomedUCID){
        return axios.delete(USER_BASE_REST_API_URL + ucid + '/' + pass + '/' + doomedUCID)
    }

    addUser(ucid, pass, user){
        return axios.post(USER_BASE_REST_API_URL + ucid + '/' + pass, user)
    }

    blockUser(ucid, pass, doomedUcid){
        return axios.get(USER_BASE_REST_API_URL + ucid + '/' + pass + '/' + doomedUcid)
    }

    updateUser(ucid, pass, user){
        return axios.put(USER_BASE_REST_API_URL + "updateUser/"+ ucid + '/' + pass, user)
    }
}

export default new UserService();