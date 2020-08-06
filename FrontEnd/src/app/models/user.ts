export class User {
  _id: string;
  nickname: string;
  name: string;
  surname: string;  email: string;
  password: string;
  rol: string;
  constructor() {
    this._id = '';
    this.nickname = 'cristiangp93';
    this.name = 'Cristian Paúl';
    this.surname = 'Guillén Parra';
    this.email = 'cristian150193@gmail.com';
    this.password = '1qaz2wsx';
    this.rol = 'Administrador';
  }
}
