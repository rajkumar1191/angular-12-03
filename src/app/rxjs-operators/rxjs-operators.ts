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
  delay,
} from 'rxjs';
import { NotificationService } from '../services/noti.service';
import { Test } from '../test/test';

interface OperatorExample {
  title: string;
  description: string;
  output: string[];
  runs: () => void;
}

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [CommonModule, JsonPipe, Test],
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

  messages: string[] = [];
  user: any = null;

  constructor(
    private http: HttpClient,
    private noti: NotificationService,
  ) {
    this.setupSearch();
    this.setupExhaust();
  }

  ngOnInit() {
    this.noti.notifications$.subscribe((msg) => {
      this.messages.push(msg);
    });
    this.noti.notifications1$.subscribe((msg) => {
      this.messages.push(msg);
    });

    this.noti.user$.subscribe((user) => {
      this.user = user;
    });
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

  setupExhaust() {
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
    }).subscribe({
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

  loadCombineLatest() {
    this.resultsFromFork.set(null);
    this.loading = true;
    combineLatest({
      posts: this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts`), // Simulate delay for posts
      users: this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users`), // Simulate delay for users
      comments: this.http.get<any[]>(`https://jsonplaceholder.typicode.com/comments`), // Simulate delay for comments
    }).subscribe({
      next: (results) => {
        console.log('CombineLatest raw results:', results);
        this.resultsFromFork.set(results);
        this.loading = false;
      },
      error: (err) => {
        console.error('CombineLatest error:', err);
        this.resultsFromFork.set({ error: 'Failed to load data' });
        this.loading = false;
      },
    });
  }

  loadWithoutShareReplay() {
    const apiCall$ = this.http.get(`https://jsonplaceholder.typicode.com/posts`).pipe(
      catchError((err) => {
        console.error('API call error:', err);
        return of({ error: 'Failed to load posts' }); // Return error object on failure
      }),
    );
    apiCall$.subscribe((data) => {
      console.log('First subscriber received:', data);
    });
    apiCall$.subscribe((data) => {
      console.log('Second subscriber received:', data);
    });
  }

  loadShareReplay() {
    const apiCall$ = this.http.get(`https://jsonplaceholder.typicode.com/posts`).pipe(
      shareReplay(1), // Cache the latest value for new subscribers
      catchError((err) => {
        console.error('API call error:', err);
        return of({ error: 'Failed to load posts' }); // Return error object on failure
      }),
    );
    apiCall$.subscribe((data) => {
      console.log('First subscriber received:', data);
    });
    apiCall$.subscribe((data) => {
      console.log('Second subscriber received:', data);
    });
  }

  sendMgs() {
    this.noti.sendNotification('Hello from RxJS demo!' + new Date().toLocaleTimeString());
  }

  
  sendMgs1() {
    this.noti.sendNotification1('Hello from RxJS demo!' + new Date().toLocaleTimeString());
  }

  login() {
    this.noti.login();
  }

  logout() {
    this.noti.logout();
  }
}
