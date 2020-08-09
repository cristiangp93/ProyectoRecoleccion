import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {

  loading: boolean;

  constructor(private modalService: NgbModal,
              private _us: UserService,
              public auth: AuthService) {
    this.getUsers().then(() => {
      this.loading = false;
    });
  }

  async getUsers() {
    this.loading = true;
    await this._us.getUsers().subscribe(resp => {
      this._us.users = resp as User[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  openWindowCustomClass(content3) {
    this.modalService.open(content3);
  }

  ngOnInit(): void {
  }

  addUser(userForm: NgForm) {
    if (userForm.invalid) {
      Object.values(userForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (userForm.value._id) {
      this._us.putUser(userForm.value).subscribe(data => {
        this.getUsers().then(() => {
          Swal.fire(
            'Ok!',
            'User actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      const userToRegister = userForm.value;
      this.auth.SignUp(userToRegister.email, userToRegister.password)
        .then( resp => {
          this._us.postUser(userToRegister).subscribe(data => {
            this.getUsers().then(() => {
              Swal.fire(
                'Ok!',
                'User registrado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
        })
        .catch(e => {
          Swal.fire(
            'Error!',
            e.message,
            'error'
          ).then(() => this.loading = false)
        })
    }

    this._us.selectedUser = new User();
    this.modalService.dismissAll();
  }

  editUser(user: User) {
    this._us.selectedUser = user;
  }

  deleteUser(_id: string) {
    this._us.deleteUser(_id)
      .subscribe(res => {
        this.getUsers().then(() => {
          Swal.fire(
            'Ok!',
            'User eliminado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
  }

}
