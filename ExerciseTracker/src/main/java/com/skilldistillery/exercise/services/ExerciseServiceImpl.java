package com.skilldistillery.exercise.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.exercise.entities.Exercise;
import com.skilldistillery.exercise.repositories.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService {

	@Autowired
	private ExerciseRepository exerciseRepo;
	
	@Override
	public List<Exercise> listAllExercises() {
		return exerciseRepo.findAll();
	}

	@Override
	public Exercise showExercise(int id) {
		Exercise exercise = exerciseRepo.queryById(id);
		if(exercise == null) {
			return null;
		}
		return exercise;
	}

	@Override
	public Exercise create(Exercise exercise) {
		exerciseRepo.saveAndFlush(exercise);
		return exercise;
	}

	@Override
	public Exercise update(int exerciseId, Exercise exercise) {
		Exercise exerciseToUpdate = exerciseRepo.queryById(exerciseId);
		exerciseToUpdate.setDistanceInMiles(exercise.getDistanceInMiles());
		exerciseToUpdate.setDate(exercise.getDate());
		exerciseToUpdate.setType(exercise.getType());
		exerciseToUpdate.setDescription(exercise.getDescription());
		return exerciseToUpdate;
	}

	@Override
	public boolean delete(int exerciseId) {
		Exercise exerciseToDelete = exerciseRepo.queryById(exerciseId);
		if(exerciseToDelete != null) {
			exerciseRepo.delete(exerciseToDelete);
			return true;
		}
		return false;
	}

}
