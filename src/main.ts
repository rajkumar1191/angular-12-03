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
  1. Template-driven Forms: Use directives in the template to create forms. Simpler and suitable for basic forms.
  2. Reactive Forms: Use FormControl and FormGroup in the component to create forms. More powerful and suitable for complex forms.

  Services: Provide reusable logic and data across components. Use dependency injection to share services.

  Router: Handle navigation between views. Define routes and use RouterOutlet to display components based on the route.

  



*/