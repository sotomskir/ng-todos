import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit, OnChanges {
  @Input() item;
  @Output() removed = new EventEmitter();
  control = new FormControl();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item && changes.item.currentValue.name) {
      this.control.setValue(changes.item.currentValue.name);
    }
  }

  remove() {
    this.removed.emit(this.item);
  }
}
