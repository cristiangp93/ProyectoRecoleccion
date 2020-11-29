import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {NgForm} from '@angular/forms';
import {AuthService} from "../../../services/auth.service";
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: []
})
export class UsersComponent implements OnInit {

  loading: boolean;
  isEdit: boolean;
  roles: any[] = [];

  constructor(private modalService: NgbModal,
              private _us: UserService,
              public auth: AuthService,
              public http: HttpClient) {
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

  openWindowCustomClass(content3, isEdit: boolean) {
    this.modalService.open(content3);
    if (!isEdit) {
      this._us.selectedUser = new User();
    }
    this.isEdit = isEdit;
  }

  ngOnInit(): void {
    this.http.get('../../../assets/docs/roles.json')
      .subscribe( (roles: any[]) => {
        this.roles = roles
      })
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
      /*this.auth.SignUp(userToRegister.email, userToRegister.password)
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
        })*/
    }

    this._us.selectedUser = new User();
    this.modalService.dismissAll();
  }

  editUser(user: User) {
    this._us.selectedUser = user;
    this.isEdit = true;
  }

  deleteUser(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el usuario?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
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
    })
  }

}
