package com.skilldistillery.exercise.services;

import java.util.List;

import com.skilldistillery.exercise.entities.Exercise;

public interface ExerciseService {

	List<Exercise> listAllExercises();

	Exercise showExercise(int id);

	Exercise create(Exercise exercise);

	Exercise update(int exerciseId, Exercise exercise);

	boolean delete(int exerciseId);
}
