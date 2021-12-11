package com.ENSF607.AnimalProject.model;

import javax.persistence.*;

@Entity
@Table(name = "ANIMAL")
public class Animal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long animalid;
	String name;
	String species;
	Character sex;
	String breed;
	Integer age;
	String rfid;
	String altered;
	Double weight;
	String specialProblem;
	String continuousMedication;
	String specialInstructions;
	String specialDiet;
	String tatoo;
	String color;
	String status;
	Long bookedId;
	String request;

	public String getRequest() {
		return request;
	}

	public void setRequest(String request) {
		this.request = request;
	}

	public Long getAnimalid() {
		return animalid;
	}

	public void setAnimalid(Long animalId) {
		this.animalid = animalId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public Character getSex() {
		return sex;
	}

	public void setSex(Character sex) {
		this.sex = sex;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getRfid() {
		return rfid;
	}

	public void setRfid(String rfid) {
		this.rfid = rfid;
	}

	public String getAltered() {
		return altered;
	}

	public void setAltered(String altered) {
		this.altered = altered;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getSpecialProblem() {
		return specialProblem;
	}

	public void setSpecialProblem(String specialProblem) {
		this.specialProblem = specialProblem;
	}

	public String getContinuousMedication() {
		return continuousMedication;
	}

	public void setContinuousMedication(String continuousMedication) {
		this.continuousMedication = continuousMedication;
	}

	public String getSpecialInstructions() {
		return specialInstructions;
	}

	public void setSpecialInstructions(String specialInstructions) {
		this.specialInstructions = specialInstructions;
	}

	public String getSpecialDiet() {
		return specialDiet;
	}

	public void setSpecialDiet(String specialDiet) {
		this.specialDiet = specialDiet;
	}

	public String getTatoo() {
		return tatoo;
	}

	public void setTatoo(String tatoo) {
		this.tatoo = tatoo;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getBookedId() {
		return bookedId;
	}

	public void setBookedId(Long bookedId) {
		this.bookedId = bookedId;
	}
}
