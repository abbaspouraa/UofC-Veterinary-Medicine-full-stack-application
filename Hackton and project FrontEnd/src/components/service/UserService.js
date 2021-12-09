import axios from 'axios'

const USER_BASE_REST_API_URL = 'http://localhost:8090/user';

class UserService{

    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URL + '/' + "getAll");
    }

    searchUsers(name, ucid, email, role){
        return axios.get(USER_BASE_REST_API_URL + '/' + name + '/' + ucid + '/' + email + '/' + role)
    }
}

export default new UserService();