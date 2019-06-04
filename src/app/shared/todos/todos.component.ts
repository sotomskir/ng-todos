import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../core/models/todo';
import { Base } from '../../core/models/base';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  items: Todo[] = [];
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = fb.group({
      name: []
    });
  }

  ngOnInit(): void {
    this.http.get<Base<Todo[]>>('api/todos').subscribe(value => {
      this.items = value.data;
    });
  }

  save() {
    this.http.post<Base<Todo>>('/api/todos', this.form.value).subscribe((value) => {
      if (value.status) {
        this.items.push(value.data);
        this.form.get('name').reset();
      } else {
        Swal.fire({
          type: 'error',
          text: value.message
        });
      }
    });
  }

  remove(item: Todo) {
    this.http.delete<Base<any>>('/api/todos/' + item.ID).subscribe((value) => {
      if (value.status) {
        this.items.splice(this.items.indexOf(item), 1);
      } else {
        Swal.fire({
          type: 'error',
          text: value.message
        });
      }
    });
  }
}
