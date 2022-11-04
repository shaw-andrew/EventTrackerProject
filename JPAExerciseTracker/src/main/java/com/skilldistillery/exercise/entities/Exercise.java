package com.skilldistillery.exercise.entities;

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
	
	@Column(name="run_distance_in_miles")
	private double runDistanceInMiles;
	
	public Exercise() {}
	
	public Exercise(int id, double runDistanceInMiles) {
		super();
		this.id = id;
		this.runDistanceInMiles = runDistanceInMiles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getRunDistanceInMiles() {
		return runDistanceInMiles;
	}

	public void setRunDistanceInMiles(double runDistanceInMiles) {
		this.runDistanceInMiles = runDistanceInMiles;
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
		return "Exercise [id=" + id + ", runDistanceInMiles=" + runDistanceInMiles + "]";
	}
	

}
