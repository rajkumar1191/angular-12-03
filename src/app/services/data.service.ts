import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly demoEndpoint = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.demoEndpoint}/${id}`);
  }

  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.demoEndpoint);
  }

  /*
    Observable - Subscribe to get data, can be cancelled, supports multiple values over time - subscribe - to get data, catch - to handle errors, finalize - to do cleanup, operators for transformation (map, filter, switchMap, etc.)
    - unsubscribe to cancel, can emit multiple values, lazy (doesn't execute until subscribed), supports operators for transformation and composition
    Promise - One-time async value, not cancellable, easier syntax for single values
  */
}
