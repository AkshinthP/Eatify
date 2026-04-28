import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../model/food';

@Injectable({
  providedIn: 'root'
})
export class FoodserviceapiService {

  private apiUrl='https://www.themealdb.com/api/json/v1/1/search.php?f=c';
  private postUrl='https://jsonplaceholder.typicode.com/posts'

  constructor(
    private http : HttpClient
  ) { }

  getFood(): Observable<Food[]>{
    return this.http.get<Food[]>(this.apiUrl)
  }

  // post(): Observable<any>{
  //   return this.http.post<
  // }
}

