package com.ENSF607.AnimalProject.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="COMMENT")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cmntid;

    private Integer userid;
    private Integer animalid;
    private String note;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
//
//    @Column(name = "UPDATED_AT", nullable = true, updatable = false)
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date updatedAt;
//
    @PrePersist
    public void setCreatedAt(){
        this.createdAt = new Date();
    }
//
//    @PreUpdate
//    public void setUpdatedAt(){
//        this.updatedAt = new Date();
//    }


    public Date getCreatedAt() {
        return createdAt;
    }

    public Integer getCmntid() {
        return cmntid;
    }

    public void setCmntid(Integer cmntid) {
        this.cmntid = cmntid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getAnimalid() {
        return animalid;
    }

    public void setAnimalid(Integer animalid) {
        this.animalid = animalid;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
