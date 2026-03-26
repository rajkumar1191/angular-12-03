import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {

  // @Input() message = '';
  // @Output() notify = new EventEmitter();

  // sendMessage(){
  //   this.notify.emit("Hello Parent")
  // }

  // message = "Child Message";

  // updateMessage(){
  //   this.message = "Updated message";
  //   console.log(this.message)
  // }

  @Input() id!: number;

  isHighlighted = false;

  highlight(){
    this.isHighlighted = true
  }

  reset(){
    this.isHighlighted = false
  }

  getStatus(){
    return `Child ${this.id} -> ${this.isHighlighted ? 'Highlighted' : 'Normal'}`
  }

}
