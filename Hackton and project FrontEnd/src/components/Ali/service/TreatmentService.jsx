import axios from 'axios'

const TREATMENT_BASE_REST_API_URL = 'http://localhost:8090/treatment/';

class TreatmentService{


    startNewTreatment(treatment){
            return axios.post(TREATMENT_BASE_REST_API_URL, treatment);
        }

    getAlertingAnimalStatus(stage){
        return axios.get (TREATMENT_BASE_REST_API_URL + '/'+ 'stage'+ '/' + stage);
    }

    getAnimalStatusByStatusId(statusid){
        return axios.get(TREATMENT_BASE_REST_API_URL + '/' + statusid);
    }

    updateAnimalStatus(statusid, animalStatus){
        return axios.put(TREATMENT_BASE_REST_API_URL + '/' + statusid,animalStatus);
    }

    
    

}

export default new TreatmentService();