import { Component } from '@angular/core';
import { NotificationService } from '../services/noti.service';

@Component({
  selector: 'app-test',
  imports: [],
  standalone: true,
  templateUrl: './test.html',
  styleUrl: './test.css',
})
export class Test {
  messages: string[] = [];

  constructor(private noti: NotificationService) {}

  ngOnInit() {
    this.noti.notifications1$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }
}
