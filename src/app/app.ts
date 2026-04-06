import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('angular-app');
  inputValue = '';
  date = new Date();

  imgSrc = 'assets/img/download.png';

  sqrtValue = 2;

  imgArray = [
    {
      id: 1,
      src: 'assets/img/download.png',
      alt: 'Angular Logo1',
      clr: 'red',
    },
    {
      id: 2,
      src: 'assets/img/download.png',
      alt: 'Angular Logo2',
      clr: 'blue',
    },
    {
      id: 3,
      src: 'assets/img/download.png',
      alt: 'Angular Logo3',
      clr: 'green',
    },
    {
      id: 4,
      src: 'assets/img/download.png',
      alt: 'Angular Logo4',
      clr: 'yellow',
    },
    {
      id: 5,
      src: 'assets/img/download.png',
      alt: 'Angular Logo5',
      clr: 'purple',
    },
    {
      id: 6,
      src: 'assets/img/download.png',
      alt: 'Angular Logo6',
      clr: 'orange',
    },
    {
      id: 7,
      src: 'assets/img/download.png',
      alt: 'Angular Logo7',
      clr: 'pink',
    },
    {
      id: 8,
      src: 'assets/img/download.png',
      alt: 'Angular Logo8',
      clr: 'brown',
    },
    {
      id: 9,
      src: 'assets/img/download.png',
      alt: 'Angular Logo9',
      clr: 'gray',
    },
    {
      id: 10,
      src: 'assets/img/download.png',
      alt: 'Angular Logo10',
      clr: 'black',
    },
  ];

  role = 'admin';

  winWidth = '200px';

  constructor(private router: Router) {}

  ngOnInit() {
    // setInterval(() => {
    //   this.sqrtValue += 2;
    // }, 2000);
  }

  navigateToAbout() {
    // this.router.navigate(['/about']);

    //navigate with parameter

    // this.router.navigate(['/pipes', 123]);
    this.router.navigate(['/pipes'], { queryParams: { name: 'raj', age: 30 } });
  }
  getCurrentYear(data: string) {
    this.date = new Date();
    console.log(this.date.getMonth() + 1, data);
    this.role = this.role === 'admin' ? 'user' : 'admin';
  }

  onInputChange(event: Event) {
    console.log(event);
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement);
    console.log(inputElement.value);
    this.inputValue = inputElement.value;
  }

  onHover() {
    // console.log('Mouse entered');
  }

  onLeave() {
    // console.log('Mouse left');
  }
}
