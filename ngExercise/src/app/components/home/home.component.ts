import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService
  ) { }

  loadExercises(){
    this.exerciseService.index().subscribe({
      next: (exercises) => {
        console.log(exercises);
        this.exercises = exercises;
      },
      error: (err) => {
        console.error('HomeComponent.loadExercises: error loading exercises');
        console.error(err);

      }
    });
  }

  ngOnInit(): void {
    this.loadExercises();
  }

}
