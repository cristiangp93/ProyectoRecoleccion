import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InventarioService} from "../../../services/inventario.service";
import {Material} from "../../../models/material";
import Swal from "sweetalert2";
import {NgForm} from "@angular/forms";
import {Vehicle} from "../../../models/vehicle";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  loading: boolean;
  isEdit:boolean;

  constructor(private modalService: NgbModal,
              private _iS: InventarioService) {
    this.getMaterials().then(() => {
      this.getVehicles().then(() => {
        this.loading = false;
      })
    });
  }

  async getMaterials() {
    this.loading = true;
    await this._iS.getMaterials().subscribe(resp => {
      this._iS.materials = resp as Material[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  async getVehicles() {
    await this._iS.getVehicles().subscribe(resp => {
      this._iS.vehicles = resp as Vehicle[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  openWindowCustomClass(content3, isEdit:boolean) {
    this.modalService.open(content3);
    if (!isEdit) {
      this._iS.selectedVehicle = new Vehicle();
      this._iS.selectedMaterial = new Material();
    }
    this.isEdit = isEdit;
  }

  ngOnInit(): void {
  }

  addMaterial(materialForm: NgForm) {
    if (materialForm.invalid) {
      Object.values(materialForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (materialForm.value._id) {
      this._iS.putMaterial(materialForm.value).subscribe(data => {
        this.getMaterials().then(() => {
          Swal.fire(
            'Ok!',
            'Material actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      this._iS.postMaterial(materialForm.value).subscribe(data => {
        this.getMaterials().then(() => {
          Swal.fire(
            'Ok!',
            'Material registrado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }

    this._iS.selectedMaterial = new Material();
    this.modalService.dismissAll();

  }

  addVehicle(vehicleForm: NgForm) {
    if (vehicleForm.invalid) {
      Object.values(vehicleForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if (vehicleForm.value._id) {
      this._iS.putVehicle(vehicleForm.value).subscribe(data => {
        this.getVehicles().then(() => {
          Swal.fire(
            'Ok!',
            'Vehiculo actualizado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    } else {
      this._iS.postVehicle(vehicleForm.value).subscribe(data => {
        this.getVehicles().then(() => {
          Swal.fire(
            'Ok!',
            'Vehiculo registrado correctamente',
            'success'
          ).then(() => this.loading = false)
        });
      });
    }

    this._iS.selectedVehicle = new Vehicle();
    this.modalService.dismissAll();

  }

  editMaterial(material: Material) {
    this._iS.selectedMaterial = material;
    this.isEdit = true;
  }

  editVehicle(vehicle: Vehicle) {
    this._iS.selectedVehicle = vehicle;
    this.isEdit = true;
  }

  deleteMaterial(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el material?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._iS.deleteMaterial(_id)
          .subscribe(res => {
            this.getMaterials().then(() => {
              Swal.fire(
                'Ok!',
                'Material eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
      }
    })
  }

  deleteVehicle(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el vehiculo?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._iS.deleteVehicle(_id)
          .subscribe(res => {
            this.getVehicles().then(() => {
              Swal.fire(
                'Ok!',
                'Vehiculo eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          });
      }
    })
  }

}
