import axios from 'axios'

const ONGOING_CARE_REST_API = 'http://localhost:8090/ongoingcare/';

class OngoingCareService{

    startNewCare(ucid, pass, care){
        return axios.post(ONGOING_CARE_REST_API + '/' + ucid + '/' + pass, care);
    }

    getAnimalCareHistory(ucid, pass, animalid){
        return axios.get(ONGOING_CARE_REST_API + '/' + ucid + '/' + pass + '/' + animalid);
    }

}

export default new OngoingCareService();