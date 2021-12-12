package com.ENSF607.AnimalProject.model;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "ANIMAL_STATUS")
public class AnimalStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long statusid;


    private String stage;
    private Integer careattid;

    private Long animalid;

    private String processDescription;
    private Double temperature;
    private Double weight;
    private Integer heartRate;
    private String symptoms;
    private String diagnoseDrug;
    private Integer vetid;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    public void setCreatedAt() {
        this.createdAt = new Date();
    }
    public Date getCreatedAt() {
        return createdAt;
    }

    public Long getStatusid() {
        return statusid;
    }

    public void setStatusid(Long statusid) {
        this.statusid = statusid;
    }

    public Long getAnimalid() {
        return animalid;
    }

    public void setAnimalid(Long animalid) {
        this.animalid = animalid;
    }

    public Integer getCareattid() {
        return careattid;
    }

    public void setCareattid(Integer careattid) {
        this.careattid = careattid;
    }

//

    public String getProcessDescription() {
        return processDescription;
    }

    public void setProcessDescription(String processDescription) {
        this.processDescription = processDescription;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
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
