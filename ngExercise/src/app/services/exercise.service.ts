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

}
