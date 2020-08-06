export class Vehicle {
  _id: string;
  descripcion: string;
  disco: number;
  marca: string;
  anio: number;
  carga: string;
  capacidad: number;
  combustible: string;
  estado: string;

  constructor() {
    this._id = '';
    this.descripcion = '';
    this.disco = 0;
    this.marca = '';
    this.anio = 1900;
    this.carga = '';
    this.capacidad = 0;
    this.combustible = 'DIESEL';
    this.estado = 'A';
  }
}
