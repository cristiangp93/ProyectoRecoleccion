import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user = {
    email: '',
    password: ''
  };

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  SignIn(loginForm: NgForm) {
    if (loginForm.invalid) {
      Object.values(loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const userForm = loginForm.value;
    this.auth.SignIn(userForm.email, userForm.password)
      .then( resp => {
        console.log(resp)
      })
      .catch( e => {
        console.log(e)
        Swal.fire(
          'Error!',
          e.message,
          'error'
        )
      })
  }

  ngOnDestroy() {
  }

}
