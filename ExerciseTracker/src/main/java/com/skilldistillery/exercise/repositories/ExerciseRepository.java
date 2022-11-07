package com.skilldistillery.exercise.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.exercise.entities.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
	Exercise queryById(int id);
}
