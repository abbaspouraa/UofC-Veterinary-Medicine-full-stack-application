package com.ENSF607.AnimalProject.model;

import javax.persistence.*;

@Entity
@Table(name="User")
public class User {


//
    @Id
    @Column(unique = true)
    private Long userid;
    private String password;
    private String fname;
    private String lname;
    private String role;
    private String email;
    private String blocked;


    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userId) {
        this.userid = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getfname() {
        return fname;
    }

    public void setfname(String fName) {
        this.fname = fName;
    }

    public String getlname() {
        return lname;
    }

    public void setlname(String lName) {
        this.lname = lName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public String getBlocked() {
		return blocked;
	}

	public void setBlocked(String blocked) {
		this.blocked = blocked;
	}
}
