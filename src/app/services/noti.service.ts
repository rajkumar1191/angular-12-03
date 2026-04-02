import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  notifications$ = this.notificationSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(null);

  user$ = this.userSubject.asObservable();

  private notificationSubject1 = new ReplaySubject<string>(3);
  notifications1$ = this.notificationSubject1.asObservable();

  sendNotification(message: string) {
    this.notificationSubject.next(message);
  }

  sendNotification1(message: string) {
    this.notificationSubject1.next(message);
  }

  login() {
    const user = { id: 1, name: 'John Doe' };
    this.userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }
}
