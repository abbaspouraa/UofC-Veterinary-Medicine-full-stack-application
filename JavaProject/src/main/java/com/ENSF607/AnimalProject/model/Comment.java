package com.ENSF607.AnimalProject.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="COMMENT")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cmntid;

    private Long userid;
    private Long animalid;
    private String note;

    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    public void setCreatedAt(){
        this.createdAt = new Date();
    }


    public Date getCreatedAt() {
        return createdAt;
    }

    public Long getCmntid() {
        return cmntid;
    }

    public void setCmntid(Long cmntid) {
        this.cmntid = cmntid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getAnimalid() {
        return animalid;
    }

    public void setAnimalid(Long animalid) {
        this.animalid = animalid;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
