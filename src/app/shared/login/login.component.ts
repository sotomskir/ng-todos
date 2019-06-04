import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Base } from '../../core/models/base';
import { Account } from '../../core/models/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private auth: AuthService, private router: Router) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.http.post<Base<Account>>('api/login', this.form.value).subscribe(value => {
      if (value.status) {
        this.auth.setToken(value.data.token);
        this.router.navigate(['/todos']);
      } else {
        Swal.fire({
          type: 'error',
          text: value.message
        });
      }
    });
  }
}
