import axios from 'axios'

const TREATMENT_BASE_REST_API_URL = 'http://localhost:8090/treatment';

class TreatmentService{


    startNewTreatment(careattid,animalName,date,processDescription,temperature,weight,
        heartRate,symptoms,diagnoseDrug,vetid){
            return axios.post(TREATMENT_BASE_REST_API_URL + '/' + careattid + '/' + animalName + '/' + date + '/' + processDescription
             + '/' + temperature + '/' + weight + '/' + heartRate + '/' + symptoms + '/' + diagnoseDrug + '/' + vetid);
        }

    
    

}

export default new TreatmentService();