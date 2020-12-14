import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
/* Componentes */
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContainersComponent} from "./containers/containers.component";
import {UsersComponent} from "./users/users.component";
import {RrhhComponent} from "./rrhh/rrhh.component";
import {RutasComponent} from "./rutas/rutas.component";
import {InventarioComponent} from './inventario/inventario.component';
import {AgmCoreModule} from "@agm/core";
import { RouteSectorComponent } from './route-sector/route-sector.component';
import { VehicleEmployeeComponent } from './vehicle-employee/vehicle-employee.component';
import {AgmDirectionModule} from "agm-direction";

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBP_oi2VSYvoa-KeAcjuTa2oxM9PT8c_AI'}),
    AgmDirectionModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    ContainersComponent,
    UsersComponent,
    RrhhComponent,
    RutasComponent,
    InventarioComponent,
    RouteSectorComponent,
    VehicleEmployeeComponent
  ]
})

export class AdminLayoutModule {
}
