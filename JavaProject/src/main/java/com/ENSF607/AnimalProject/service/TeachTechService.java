//package com.ENSF607.AnimalProject.service;
//
//import com.ENSF607.AnimalProject.model.Animal;
//import com.ENSF607.AnimalProject.model.AnimalStatus;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class TeachTechService extends UserServiceImpl {
//
//    public List<AnimalStatus> seeAnimalsTreatment(){
//        String query = "SELECT * FROM animalstatus";
//        return jdbcTemplate.query(
//                query,
//                new BeanPropertyRowMapper<AnimalStatus>(AnimalStatus.class)
//        );
//    }
//
//    public void addNewAnimal(Animal animal){
//        String query = "INSERT INTO animal(" +
//                "AnimalID," +
//                " Name," +
//                " Species," +
//                " Sex," +
//                " Breed," +
//                " Age," +
//                " RFID," +
//                " Alerted," +
//                " Weight," +
//                " Special_Problem," +
//                " Continuous_Medication," +
//                " Special_Instractions," +
//                " Special_Diet," +
//                " Tatoo," +
//                " Color," +
//                " Status," +
//                " BookedId" +
//                ")\n" +
//                "VALUES\n" +
//                "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
//        jdbcTemplate.update(
//                query,
//                animal.getAnimalId(),
//                animal.getName(),
//                animal.getSpecies(),
//                animal.getSex(),
//                animal.getBreed(),
//                animal.getAge(),
//                animal.getRfid(),
//                animal.getAltered(),
//                animal.getWeight(),
//                animal.getSpecial_Problem(),
//                animal.getContinuous_Medication(),
//                animal.getSpecial_Diet(),
//                animal.getTatoo(),
//                animal.getColor(),
//                animal.getStatus(),
//                animal.getBookedId()
//        );
//    }
//
////    public void requestAnimal(Animal animal){
////        String query = "";
////        jdbcTemplate.update(
////                query,
////                this.
////        );
////    }
//}
