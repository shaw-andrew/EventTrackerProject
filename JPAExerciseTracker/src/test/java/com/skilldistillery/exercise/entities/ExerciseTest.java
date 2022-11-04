package com.skilldistillery.exercise.entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExerciseTest {
	
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Exercise exercise;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAExerciseTracker");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		exercise = em.find(Exercise.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		exercise = null;
	}

	@Test
	void test_Exercise_mapping() {
		assertNotNull(exercise);
		assertEquals(3.5, exercise.getRunDistanceInMiles());
	}

}
