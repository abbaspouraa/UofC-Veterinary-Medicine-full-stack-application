package com.ENSF607.AnimalProject.model;

import java.util.Date;

public class CommentDTO {
    private Long cmntid;
    private Long userid;
    private Long animalid;
    private String note;
    private Date createdAt;
    private String fname;
    private String lname;
    private String role;

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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
