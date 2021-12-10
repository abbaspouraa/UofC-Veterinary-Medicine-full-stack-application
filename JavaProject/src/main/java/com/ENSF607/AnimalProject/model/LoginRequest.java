package com.ENSF607.AnimalProject.model;

public class LoginRequest {

	private Long ucid;
	private String password;
	
	public LoginRequest(Long ucid, String password) {
		this.ucid = ucid;
		this.password = password;
	}
	
	public Long getUcid() {
		return ucid;
	}
	public void setUcid(Long ucid) {
		this.ucid = ucid;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
