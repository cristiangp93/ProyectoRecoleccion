export class User {
  _id: string;
  nickname: string;
  name: string;
  surname: string;  email: string;
  password: string;
  rol: string;
  constructor() {
    this._id = '';
    this.nickname = '';
    this.name = '';
    this.surname = '';
    this.email = '';
    this.password = '';
    this.rol = 'Administrador';
  }
}
