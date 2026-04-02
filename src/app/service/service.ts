import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, PostModel } from '../services/data.service';
import { NotificationService } from '../services/noti.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.html',
  styleUrl: './service.css',
})
export class Service implements OnInit {
  posts: PostModel[] = [];
  selectedPost: PostModel | null = null;

  private dataService = inject(DataService);

  messages: string[] = [];

  constructor(private noti: NotificationService) {}

  ngOnInit() {
    this.noti.notifications1$.subscribe((msg) => {
      this.messages.push(msg);
    });

    // real-time use: fetch a list from API on init
    this.dataService.getPosts().subscribe((data) => {
      this.posts = data.slice(0, 5);
    });
  }

  loadPost(id: number) {
    this.dataService.getPost(id).subscribe((post) => {
      this.selectedPost = post;
    });
  }
}
