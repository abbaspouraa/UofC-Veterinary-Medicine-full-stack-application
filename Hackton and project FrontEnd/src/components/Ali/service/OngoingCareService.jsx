import axios from 'axios'

const ONGOING_CARE_REST_API = 'http://localhost:8090/ongoingcare/';

class OngoingCareService{

    startNewCare(care){
        return axios.post(ONGOING_CARE_REST_API, care);
    }

    getAnimalCareHistory(animalid){
        return axios.get(ONGOING_CARE_REST_API + '/' + animalid);
    }

}

export default new OngoingCareService();