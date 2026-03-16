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

  imgSrc = 'assets/img/download.png';

  imgArray = [
    {
      id: 1,
      src: 'assets/img/download.png',
      alt: 'Angular Logo1',
    },
    {
      id: 2,
      src: 'assets/img/download.png',
      alt: 'Angular Logo2',
    },
    {
      id: 3,
      src: 'assets/img/download.png',
      alt: 'Angular Logo3',
    },
    {
      id: 4,
      src: 'assets/img/download.png',
      alt: 'Angular Logo4',
    },
    {
      id: 5,
      src: 'assets/img/download.png',
      alt: 'Angular Logo5',
    },
    {
      id: 6,
      src: 'assets/img/download.png',
      alt: 'Angular Logo6',
    },
    {
      id: 7,
      src: 'assets/img/download.png',
      alt: 'Angular Logo7',
    },
    {
      id: 8,
      src: 'assets/img/download.png',
      alt: 'Angular Logo8',
    },
    {
      id: 9,
      src: 'assets/img/download.png',
      alt: 'Angular Logo9',
    },
    {
      id: 10,
      src: 'assets/img/download.png',
      alt: 'Angular Logo10',
    },
  ]

  role = 'admin';


  getCurrentYear(data: string) {
    this.date = new Date();
    console.log(this.date.getMonth() + 1, data);
    this.role = this.role === 'admin' ? 'user' : 'admin';
  }
}
