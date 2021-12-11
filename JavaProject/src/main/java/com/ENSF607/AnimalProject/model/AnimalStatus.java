package com.ENSF607.AnimalProject.model;

import javax.persistence.*;


@Entity
@Table(name = "ANIMAL_STATUS")
public class AnimalStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer statusid;


    private String stage;
    private Integer careattid;

    private String animalName;

    private String date;
    private String processDescription;
    private Integer temperature;
    private Integer weight;
    private Integer heartRate;
    private String symptoms;
    private String diagnoseDrug;
    private Integer vetid;

    public Integer getStatusid() {
        return statusid;
    }

    public void setStatusid(Integer statusid) {
        this.statusid = statusid;
    }

    public Integer getCareattid() {
        return careattid;
    }

    public void setCareattid(Integer careattid) {
        this.careattid = careattid;
    }

    public String getAnimalName() {
        return animalName;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getProcessDescription() {
        return processDescription;
    }

    public void setProcessDescription(String processDescription) {
        this.processDescription = processDescription;
    }

    public Integer getTemperature() {
        return temperature;
    }

    public void setTemperature(Integer temperature) {
        this.temperature = temperature;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnoseDrug() {
        return diagnoseDrug;
    }

    public void setDiagnoseDrug(String diagnoseDrug) {
        this.diagnoseDrug = diagnoseDrug;
    }

    public Integer getVetid() {
        return vetid;
    }

    public void setVetid(Integer vetid) {
        this.vetid = vetid;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }
}
