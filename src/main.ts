import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

/*
  Component: Building block of angular application

  Data Binding: Communication between component and template

  {{}}: Interpolation - Displaying data from component to template

  1. Data Binding: Communication between component and template
  2. Property Binding: [property]="expression" - Bind component property to template element
  3. Event Binding: (event)="handler" - Bind template event to component method
  4. Two-way Binding: [(ngModel)]="property" - Sync data between component and template

  Directives: Instructions in the template that modify the DOM. Change the structure or appearance of the DOM.
  1. Structural Directives: *ngIf, *ngFor - Change the structure of the DOM
  2. Attribute Directives: [ngClass], [ngStyle] - Change the appearance or behavior of an element
  3. Component Directives: Custom components that encapsulate template, styles, and logic
  4. Custom Directives: User-defined directives for specific behavior or appearance

  Lifecycle Hooks: Methods that allow you to tap into key moments in a component's lifecycle. ngOnInit, ngOnChanges, ngOnDestroy - Perform actions at specific points in the component's lifecycle
  1. ngOnInit: Called once after the first ngOnChanges. Initialize component data.
  2. ngOnChanges: Called when an input property changes. Respond to changes in input properties.
  3. ngOnDestroy: Called just before the component is destroyed. Clean up resources.
  4. Other Hooks: ngDoCheck, ngAfterViewInit, ngAfterContentInit - Additional lifecycle hooks for specific use cases

  order of execution:
  1. ngOnChanges
  2. ngOnInit
  3. ngDoCheck
  4. ngAfterContentInit
  5. ngAfterContentChecked
  6. ngAfterViewInit
  7. ngAfterViewChecked
  8. ngOnDestroy


  Pipes: Transform data in the template. Format data for display.
  1. Built-in Pipes: DatePipe, CurrencyPipe, UpperCasePipe - Predefined transformations for common data types
  2. Custom Pipes: User-defined pipes for specific transformations

  Forms: Handle user input and validation. Two types: Template-driven and Reactive forms.
  1. Template-driven Forms: Use directives in the template to create forms. Simpler and suitable for basic forms (small forms, quick validation, minimal setup).
  2. Reactive Forms: Use FormControl and FormGroup in the component to create forms. More powerful and suitable for complex forms (dynamic controls, nested groups, custom validators, reactive streams, unit-testable model logic).

  Choose template-driven when:
  - form rules are simple
  - you prefer template syntax and minimal boilerplate
  - you are building small forms with basic validation

  Choose reactive when:
  - you need explicit form model control from code
  - you need dynamic addition/removal of controls and validators
  - you need advanced validation, complex interactions, or easy unit testing

  Services: Provide reusable logic and data across components. Use dependency injection to share services.

  Signals and Change Detection:
  - signal(): Reactive value container (like state) that auto-updates template consumers.
  - computed(): Memoized derived values from signals, recompute only when deps change.
  - effect(): Side-effect block executed when referenced signal values change.
  - OnPush works naturally with signals: template updates are driven by signal reads, not by global CD sweep.
  - For legacy state, ChangeDetectorRef.markForCheck() or detectChanges() are needed in OnPush, showing extra boilerplate and complexity.

  Recommended usage:
  - Use signals for fine-grained reactive state and performance-sensitive UI.
  - Use standard objects / forms for non-reactive, simple templates.
  - Bridge both: signals in services + template as consumed state for clean, predictable updates.

  Router: Handle navigation between views. Define routes and use RouterOutlet to display components based on the route.

  State strategy guidelines:
  - NgRx (Redux-like): use for cross-app global state, complex domain logic, time-travel debugging, action/reducer traceability, and shared data across many components.
  - Signals: use for component-local fine-grained reactive values and derived state with automatic template tracking, especially when you want minimal boilerplate and let change detection be efficient.
  - Local component state: simplest for one-off or isolated UI data, form control models, and small transient values (e.g., toggles, counters) where splitting into a full global store is overengineering.

  Recommended in this app:
  - route data & feature modules via Router
  - per-view run demo states in components
  - shared cross-view session/app state via NgRx store
  - component UI details via signals/local state


  Route Guards: Control access to routes. CanActivate, CanDeactivate, Resolve - Implement logic to allow or prevent navigation.
  1. CanActivate: Check if a route can be activated. Used for authentication and authorization.
  2. CanDeactivate: Check if a route can be deactivated. Used for unsaved changes warnings.
  3. Resolve: Pre-fetch data before activating a route. Used to ensure necessary data is available before navigation.
  4. CanActivateChild: Check if child routes can be activated. Used for protecting nested routes.
  5. CanLoad: Check if a lazy-loaded module can be loaded. Used for controlling access to lazy-loaded features.

  Interceptors: Intercept HTTP requests and responses. Used for logging, authentication, error handling, etc.


  RxJS: Reactive programming library for handling asynchronous data streams. Provides operators for transforming, filtering, and combining streams.

  Observables: Core primitive in RxJS representing a stream of values over time. Can be created from various sources (events, HTTP requests, etc.) and can be subscribed to for handling emitted values.

  Observers: Objects that subscribe to observables to receive emitted values. Define handlers for next, error, and complete notifications.

  Operators: Functions that take an observable and return a new observable. Used for transforming, filtering, and combining observables. pipe() method is used to chain operators together.

  Subjects: Special type of observable that allows values to be multicasted to multiple observers. Can act as both an observable and an observer.

  map(): Transform emitted values by applying a function to each value. Used for data transformation and projection.
  this.http.get<User[]>('/api/data').pipe(map(response => response.data)).subscribe(data => console.log(data));

  filter(): Filter emitted values based on a predicate function. Used for conditional data processing.
  this.http.get<User[]>('/api/data').pipe(filter(item => item.active)).subscribe(activeItems => console.log(activeItems));

  switchMap(): Map to a new observable and switch to it. Used for handling dependent asynchronous operations (e.g., user input triggering API calls).
  mergeMap(): Map to a new observable and merge results. Used for handling concurrent asynchronous operations where order doesn't matter.
  concatMap(): Map to a new observable and concatenate results. Used for handling asynchronous operations where order matters.
  exhaustMap(): Map to a new observable and ignore new ones until the current one completes. Used for handling exclusive asynchronous operations (e.g., form submission).

  shareReplay(): Share the last emitted value among multiple subscribers without re-running the source observable. Used for caching and sharing results of expensive operations (e.g., API calls).
  forkJoin(): Run multiple observables in parallel and receive the final combined result once all complete. Used for combining results from multiple independent asynchronous operations.
  combineLatest(): Combine the latest values from multiple observables whenever any of them emits. Used for combining dependent streams of data (e.g., form inputs).

  subjects:
  BehaviorSubject: A subject that requires an initial value and emits the current value to new subscribers. Used for representing state that can change over time (e.g., user authentication status).
  ReplaySubject: A subject that can buffer a specified number of emitted values and replay them to new subscribers. Used for retaining a history of emitted values (e.g., chat messages).
  AsyncSubject: A subject that emits only the last value upon completion. Used for representing a single transactional result that is only available after completion (e.g., a file upload result).
  


*/