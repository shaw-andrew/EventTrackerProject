package com.skilldistillery.exercise.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Exercise {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="distance_in_miles")
	private double distanceInMiles;
	
	private String type;
	
	private String description;
	
	private LocalDate date;
	
	public Exercise() {}
	
	public Exercise(int id, double distanceInMiles, String type, String description, LocalDate date) {
		super();
		this.id = id;
		this.distanceInMiles = distanceInMiles;
		this.type = type;
		this.description = description;
		this.date = date;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getDistanceInMiles() {
		return distanceInMiles;
	}

	public void setDistanceInMiles(double runDistanceInMiles) {
		this.distanceInMiles = runDistanceInMiles;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Exercise other = (Exercise) obj;
		return id == other.id;
	}
	
	@Override
	public String toString() {
		return "Exercise [id=" + id + ", runDistanceInMiles=" + distanceInMiles + "]";
	}
	
}
