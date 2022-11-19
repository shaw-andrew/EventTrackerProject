import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];
  selected: null | Exercise = null;
  newExercise: Exercise = new Exercise;
  editExercise: null | Exercise = null;
  addView: boolean = false;
  editView: boolean = false;
  tableView: boolean = false;
  detailView:boolean = true;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.loadExercises();
    this.displayTable();
  }

  loadExercises() {
    this.exerciseService.index().subscribe({
      next: (exercises) => {
        console.log(exercises);
        this.exercises = exercises;
      },
      error: (err) => {
        console.error('HomeComponent.loadExercises: error loading exercises');
        console.error(err);
      },
    });
  }

  deleteExercise(todoId: number) {
    this.exerciseService.destroy(todoId).subscribe({
      next: (success) => {
        this.loadExercises();
      },
      error: (err) => {
        console.error('exerciseListComponent.deleteExercise: could not delete');
        console.error(err);
      },
    });
  }

  addExercise(exercise: Exercise) {
    this.exerciseService.create(exercise).subscribe({
      next: (created) => {
        this.loadExercises();
        this.newExercise = new Exercise();
      },
      error: (fail) => {
        console.error('exerciseListComponent.addExercise:');
        console.error(fail);
      },
    });
  }

  displayExercise(exercise: Exercise) {
    this.selected = exercise;
    this.tableView = false;
    this.addView = false;
    this.editView = false;
    this.detailView = true;
  }

  displayTable(){
    this.tableView = true;
    this.addView = false;
    this.editView = false;
    this.detailView = false;
  }

  addExerciseForm(){
    this.addView = true;
    this.tableView = false;
    this.editView = false;
    this.detailView = false;
  }
  editExerciseForm(){
    this.addView = false;
    this.tableView = false;
    this.editView = true;
    this.detailView = false;
  }

  setEditExercise() {
    this.editExercise = Object.assign({}, this.selected);
  }

  updateExercise(exercise: Exercise, goToDetail = true): void {

    this.exerciseService.update(exercise).subscribe({
      next: (updated) => {
        if (goToDetail) {
          this.selected = updated;
        }
        this.loadExercises();
        this.editExercise = null;
      },
      error: (err) => {
        console.error('ExerciseListHttpComponent.updateExercise() error updating Exercise');
        console.error(err);
      },
    });
  }
}
