import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  /*{path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: ''},
  {path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: ''},
  {path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: ''},
  {path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: ''},
  {path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: ''},
  {path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: ''},*/
  /* Paths correctos */
  {path: '/dashboard', title: 'Dashboard', icon: 'ni-chart-bar-32 text-blue', class: ''},
  {path: '/containers', title: 'Contenedores', icon: 'fa fa-briefcase text-orange', class: ''},
  {path: '/inventario', title: 'Inventario', icon: 'fa fa-file text-red', class: ''},
  {path: '/rrhh', title: 'Recursos Humanos', icon: 'fa fa-users text-info', class: ''},
  {path: '/rutas', title: 'Rutas', icon: 'fa fa-map-pin text-primary', class: ''},
  {path: '/users', title: 'Usuarios', icon: 'ni-single-02 text-yellow', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
