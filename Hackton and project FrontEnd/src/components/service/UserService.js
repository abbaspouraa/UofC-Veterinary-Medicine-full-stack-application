import axios from 'axios'

const USER_BASE_REST_API_URL = 'http://localhost:8090/user';

class UserService{

    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URL + '/' + "getAll");
    }

    searchUsers(fname, lname, ucid, email, role){
        return axios.get(USER_BASE_REST_API_URL + '/' + fname + '/' + lname + '/' + ucid + '/' + email + '/' + role)
    }

    removeUser(ucid){
        return axios.delete(USER_BASE_REST_API_URL + '/' + ucid)
    }

    addUser(fname, lname, ucid, email, role, password){
        return axios.post(USER_BASE_REST_API_URL + '/' + fname + '/' + lname + '/' + ucid + '/' + email + '/' + role + '/' + password)
    }

    blockUser(ucid){
        return axios.get(USER_BASE_REST_API_URL + '/' + ucid)
    }

    editUser(fname, lname, ucid, email, role){
        return axios.put(USER_BASE_REST_API_URL + '/' + fname + '/' + lname + '/' + ucid + '/' + email + '/' + role)
    }
}

export default new UserService();