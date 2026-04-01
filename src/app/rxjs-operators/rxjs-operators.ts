import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, signal } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  interval,
  map,
  merge,
  mergeMap,
  of,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  throwError,
  Observable,
  from,
  exhaustMap,
} from 'rxjs';

interface OperatorExample {
  title: string;
  description: string;
  output: string[];
  runs: () => void;
}

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './rxjs-operators.html',
  styleUrl: './rxjs-operators.css',
})
export class RxjsOperatorsDemo {
  loading = false;
  searchSubject = new Subject<string>();
  click$ = new Subject<number>();
  results: any[] = [];
  resultsFromFork: any = signal(null);

  postId = [1, 2, 3, 4, 5];

  constructor(private http: HttpClient) {
    this.setupSearch();
    this.setupExhaust();
  }

  setupSearch() {
    this.results = [];
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          this.loading = true;
          return this.http.get(`https://jsonplaceholder.typicode.com/posts?q=${query}`).pipe(
            catchError((err) => {
              console.error('Search error:', err);
              return of([]); // Return empty results on error
            }),
          );
        }),
      )
      .subscribe((results: any) => {
        this.loading = false;
        this.results = results;
        console.log('Search results:', results);
      });
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchSubject.next(query);
  }

  mergeMapExample() {
    this.results = [];
    this.loading = true;
    from(this.postId)
      .pipe(
        mergeMap((id) =>
          this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
            catchError((err) => {
              console.error(`Error fetching post ${id}:`, err);
              return of({ error: `Failed to fetch post ${id}` }); // Return error object on failure
            }),
          ),
        ),
      )
      .subscribe((result) => {
        this.results.push(result);
        console.log('Fetched post:', result);
        this.loading = false;
      });
  }

  concatMapExample() {
    this.results = [];
    this.loading = true;
    from(this.postId)
      .pipe(
        concatMap((id) =>
          this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
            catchError((err) => {
              console.error(`Error fetching post ${id}:`, err);
              return of({ error: `Failed to fetch post ${id}` }); // Return error object on failure
            }),
          ),
        ),
      )
      .subscribe((result) => {
        this.results.push(result);
        console.log('Fetched post:', result);
        this.loading = false;
      });
  }

  setupExhaust(){
    this.click$
      .pipe(
        exhaustMap((id) =>
          this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
            catchError((err) => {
              console.error(`Error fetching post ${id}:`, err);
              return of({ error: `Failed to fetch post ${id}` }); // Return error object on failure
            }),
          ),
        ),
      )
      .subscribe((result) => {
        this.results.push(result);
        console.log('Fetched post:', result);
      });
  }

  exhaustMapExample() {
    // this.results = [];
    // this.loading = true;
    // from(this.postId)
    //   .pipe(
    //     exhaustMap((id) =>
    //       this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
    //         catchError((err) => {
    //           console.error(`Error fetching post ${id}:`, err);
    //           return of({ error: `Failed to fetch post ${id}` }); // Return error object on failure
    //         }),
    //       ),
    //     ),
    //   )
    //   .subscribe((result) => {
    //     this.results.push(result);
    //     console.log('Fetched post:', result);
    //     this.loading = false;
    //   });

    const randomId = Math.floor(Math.random() * 5) + 1; // Random ID between 1 and 5
    this.click$.next(randomId);
  }


  loadForkJoin() {
    this.resultsFromFork.set(null);
    this.loading = true;
    forkJoin({
      post: this.http.get(`https://jsonplaceholder.typicode.com/posts`),
      user: this.http.get(`https://jsonplaceholder.typicode.com/users`),
      comments: this.http.get(`https://jsonplaceholder.typicode.com/comments`),
    })
      .subscribe({
        next: (results) => {
          this.resultsFromFork.set(results);
          console.log('ForkJoin results:', results);
          this.loading = false;
        },
        error: (err) => {
          console.error('ForkJoin error:', err);
          this.resultsFromFork.set({ error: 'Failed to load data' });
          this.loading = false;
        },
      });
  }
}
