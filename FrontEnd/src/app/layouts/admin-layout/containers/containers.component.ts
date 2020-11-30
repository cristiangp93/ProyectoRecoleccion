import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ContainerService} from "../../../services/container.service";
import {Container} from "../../../models/container";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styles: []
})
export class ContainersComponent implements OnInit {
  lat = -2.7705791;
  lng = -78.8464126;
  zoom = 15;
  loading: boolean;
  isEdit:boolean;

  constructor(private modalService: NgbModal,
              public _cS: ContainerService) {
    this.getContainers().then(() => {
      this.loading = false;
    });
  }

  async getContainers() {
    this.loading = true;
    this._cS.getContainers().subscribe( resp =>{
      this._cS.containers = resp as Container[];
    }, error => {
      console.log(`Error: ${error}`);
    });
  }

  openWindowCustomClass(content3, isEdit:boolean) {
    this.modalService.open(content3);
    if (!isEdit) {
      this._cS.selected_container = new Container();
    }
    this.isEdit = isEdit;
  }

  ngOnInit(): void {
  }

  placeMarker($event){
    this._cS.selected_container.lat = $event.coords.lat;
    this._cS.selected_container.lng = $event.coords.lng;
  }

  addContainer( containerForm: NgForm) {
    if (containerForm.invalid) {
      Object.values(containerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if( containerForm.value._id) {
      this._cS.putContainer(this._cS.selected_container).subscribe(data => {
        this.getContainers().then(() => {
          Swal.fire(
            'Ok!',
            'Contenedor actualizado correctamente',
            'success'
          ).then(() => {
            this._cS.selected_container = new Container();
          })
        });
      });
    } else {
      this._cS.postContainer(this._cS.selected_container).subscribe(data => {
        this.getContainers().then(() => {
          Swal.fire(
            'Ok!',
            'Contenedor registrado correctamente',
            'success'
          ).then(() => {
            this._cS.selected_container = new Container();
          })
        });
      });
    }

    this.loading = false
    this.modalService.dismissAll();
  }

  editContainer( container: Container) {
    this._cS.selected_container = container;
    this.isEdit = true;
  }

  deleteContainer(_id: string) {
    Swal.fire({
      title: 'Desea eliminar el contenedor?',
      text: "No podrá revertir este proceso",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._cS.deleteContainer(_id)
          .subscribe(res => {
            this.getContainers().then(() => {
              Swal.fire(
                'Ok!',
                'Contenedor eliminado correctamente',
                'success'
              ).then(() => this.loading = false)
            });
          })
      }
    })
  }

}
