import axios from 'axios'

const TREATMENT_BASE_REST_API_URL = 'http://localhost:8090/treatment/';


class TreatmentService{


    startNewTreatment(ucid, pass, treatment){
            return axios.post(TREATMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass, treatment);
        }

    getAlertingAnimalStatus(ucid, pass, stage){
        return axios.get (TREATMENT_BASE_REST_API_URL + '/'+ 'stage'+ '/'+ ucid + '/' + pass + '/' + stage);
    }

    getAnimalStatusRecordsByAnimalId(ucid, pass, animalid){
        return axios.get(TREATMENT_BASE_REST_API_URL + '/' + 'record' + '/' + ucid + '/' + pass + '/' + animalid);
    }

    getAnimalStatusByStatusId(ucid, pass, statusid){
        return axios.get(TREATMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass + '/' + statusid);
    }

    updateAnimalStatus(ucid, pass, statusid, animalStatus){
        return axios.put(TREATMENT_BASE_REST_API_URL + '/' + ucid + '/' + pass + '/' + statusid,animalStatus);
    }

    
    

}

export default new TreatmentService();