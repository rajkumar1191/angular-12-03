import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Child } from '../child/child';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  imports: [Child, CommonModule],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent implements AfterViewInit {
  // messageToChild = 'Hai welcome to Angular';

  // receiveNotification(event: any) {
  //   console.log(event)
  // }

  // @ViewChild(Child) child!: Child;

  // ngAfterViewInit(): void {
  //   console.log(this.child.message);
  // }

  // updateChild(){
  //   this.child.updateMessage();
  // }

  @ViewChildren(Child) children!: QueryList<Child>;

  childIds = [1, 2, 3, 4];

  ngAfterViewInit(): void {
    console.log('Childrens loaded', this.children);
  }

  highlight() {
    this.children.forEach((child) => child.highlight());
  }

  reset() {
    this.children.forEach((child) => child.reset());
  }

  logStatus() {
    this.children.forEach((child) => {console.log(child.getStatus())});
  }
}
