import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.http.post<any>('api/register', this.form.value).subscribe(value => {
      console.log(value);
      if (value.status) {
        Swal.fire({
          type: 'success',
          text: 'Account has been created'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      } else {
        Swal.fire({
          type: 'error',
          text: value.message
        });
      }
    });
  }
}
