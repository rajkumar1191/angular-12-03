import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { About } from './about/about';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, DatePipe, About],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('angular-app');
  inputValue = '';
  date = new Date();
}
