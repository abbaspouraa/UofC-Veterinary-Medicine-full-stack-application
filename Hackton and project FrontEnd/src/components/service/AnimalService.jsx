import axios from 'axios'

const ANIMAL_BASE_REST_API_URL = 'http://localhost:8090/animal/';

class AnimalService{

    createAnimal(ucid, pass, animal){
        return axios.post(ANIMAL_BASE_REST_API_URL + ucid + '/' + pass, animal)
    }

    updateAnimalRequest(ucid, pass, id, status){
        return axios.get(ANIMAL_BASE_REST_API_URL + ucid + '/' + pass + '/' + id + '/' + status);
    }

    deleteAnimal(ucid, pass, animalId){
        return axios.delete(ANIMAL_BASE_REST_API_URL   + ucid + '/' + pass + '/' + animalId);
    }

    getSearchAnimal(ucid, pass, name, species, sex){
        return axios.get(ANIMAL_BASE_REST_API_URL + ucid + '/' + pass + '/' + name +  '/' + species + '/' + sex);
    }

    getAllAnimal(ucid, pass){
        return axios.get(ANIMAL_BASE_REST_API_URL + "getAll/" + ucid + '/' + pass);
    }

    getRequestedAnimals(ucid, pass, request){
        return axios.get(ANIMAL_BASE_REST_API_URL + "getRequested/" + ucid + '/' + pass + '/' + request);
    }

    getRequestedByMe(ucid, pass){
        return axios.get(ANIMAL_BASE_REST_API_URL + "getByMe/" + ucid + '/' + pass );
    }

    updateAnimalStatus(ucid, pass, id, status){
        return axios.get(ANIMAL_BASE_REST_API_URL + "stat/" + ucid + '/' + pass +  '/' + id + '/' + status);
    }
}

export default new AnimalService();