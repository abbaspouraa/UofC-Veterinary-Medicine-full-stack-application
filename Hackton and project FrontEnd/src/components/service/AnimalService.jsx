import axios from 'axios'

const ANIMAL_BASE_REST_API_URL = 'http://localhost:8090/animal';

class AnimalService{

    createAnimal(animal){
        return axios.post(ANIMAL_BASE_REST_API_URL, animal)
    }

    updateAnimalRequest(ucid, pass, id, status){
        return axios.get(ANIMAL_BASE_REST_API_URL + '/' + ucid + '/' + pass + '/' + id + '/' + status);
    }

    deleteAnimal(animalId){
        return axios.delete(ANIMAL_BASE_REST_API_URL + '/' + animalId);
    }

    getSearchAnimal(name, species, sex){
        return axios.get(ANIMAL_BASE_REST_API_URL + '/' + name +  '/' + species + '/' + sex);
    }

    getAllAnimal(){
        return axios.get(ANIMAL_BASE_REST_API_URL + '/' + "getAll");
    }

    getAllAnimalByStatus(status){
        return axios.get(ANIMAL_BASE_REST_API_URL + "/getStats/" + status);
    }
}

export default new AnimalService();