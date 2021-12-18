package com.ENSF607.AnimalProject.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ONGOING_CARE")
public class OngoingCare {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	Long ongoingCareId;

	Long careAttId;
	Long animalid;
	String processDescription;
	Double weight;
	String drug;
	String nextDue;
	String note;

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

    public Long getOngoingCareId() {
        return ongoingCareId;
    }

    public void setOngoingCareId(Long ongoingCareId) {
        this.ongoingCareId = ongoingCareId;
    }

    public Long getCareAttId() {
        return careAttId;
    }

    public void setCareAttId(Long careAttId) {
        this.careAttId = careAttId;
    }

    public Long getAnimalid() {
        return animalid;
    }

    public void setAnimalid(Long animalid) {
        this.animalid = animalid;
    }

    public String getProcessDescription() {
        return processDescription;
    }

    public void setProcessDescription(String processDescription) {
        this.processDescription = processDescription;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getDrug() {
        return drug;
    }

    public void setDrug(String drug) {
        this.drug = drug;
    }

    public String getNextDue() {
        return nextDue;
    }

    public void setNextDue(String nextDue) {
        this.nextDue = nextDue;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
