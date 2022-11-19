import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  baseUrl = 'http://localhost:8088/';
  url = this.baseUrl + 'api/exercises'

  newExercise: null | Exercise = null;

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ExerciseService.index(): error retrieving exercises: ' + err)
        );
      })
    );
  }

  show(exerciseId: number): Observable<Exercise> {
    return this.http.get<Exercise>(this.url + '/' + exerciseId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ExerciseService.show(): error retrieving exercise: ' + err)
        );
      })
    );
  }
  create(newExercise: Exercise) {
    // this.newExercise.description = '';
    // this.newExercise.completed = false;
    return this.http.post<Exercise>(this.url, newExercise).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ExerciseService.create(): error creating exercise: ' + err)
        );
      })
    );
  }

  update(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.url + '/' + exercise.id, exercise).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ExerciseService.update(): error updating exercise: ' + err)
        );
      })
    );
  }

  destroy(exerciseId: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + exerciseId).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('ExerciseService.delete(): error deleting exercise: ' + err)
        );
      })
    );
  }


}
