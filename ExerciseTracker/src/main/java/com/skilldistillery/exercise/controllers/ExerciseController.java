package com.skilldistillery.exercise.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.exercise.entities.Exercise;
import com.skilldistillery.exercise.services.ExerciseService;

@RestController
@RequestMapping("api")
public class ExerciseController {

	@Autowired
	private ExerciseService exSvc;

	@GetMapping("exercises")
	public List<Exercise> listExercises() {
		return exSvc.listAllExercises();
	}

	@GetMapping("exercises/{exerciseId}")
	public Exercise getExercise(@PathVariable("exerciseId") Integer exerciseId, HttpServletResponse res) {
		Exercise exercise = exSvc.showExercise(exerciseId);
		if (exercise == null) {
			res.setStatus(404);
		}
		return exercise;
	}

	@PostMapping("exercises")
	public Exercise createExercise(@RequestBody Exercise exercise, HttpServletResponse res, HttpServletRequest req) {
		try {
			exSvc.create(exercise);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(exercise.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			exercise = null;
		}
		return exercise;
	}

	@PutMapping("exercises/{exerciseId}")
	public Exercise updateExercise(@PathVariable("exerciseId") Integer exerciseId, @RequestBody Exercise exercise,
			HttpServletResponse res) {
		try {
			exercise = exSvc.update(exerciseId, exercise);
			if (exercise == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			exercise = null;
		}
		return exercise;
	}

	@DeleteMapping("exercises/{exerciseId}")
	public void deleteExercise(@PathVariable("exerciseId") Integer exerciseId, HttpServletResponse res) {
		try {
			if (exSvc.delete(exerciseId)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}

}
