import {Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {UsersComponent} from './users/users.component';
import {ContainersComponent} from "./containers/containers.component";
import {RrhhComponent} from "./rrhh/rrhh.component";
import {RutasComponent} from "./rutas/rutas.component";
import {InventarioComponent} from "./inventario/inventario.component";
import {RouteSectorComponent} from "./route-sector/route-sector.component";

export const AdminLayoutRoutes: Routes = [
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  /* Paths correctos*/
  {path: 'dashboard', component: DashboardComponent},
  {path: 'containers', component: ContainersComponent},
  {path: 'rrhh', component: RrhhComponent},
  {path: 'rutas', component: RutasComponent},
  {path: 'users', component: UsersComponent},
  {path: 'inventario', component: InventarioComponent},
  {path: 'rutas-sector', component: RouteSectorComponent}
];
