import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesSectorService {

  routesSector: any[] = [];

  constructor(public http: HttpClient) {
  }

  getRouteSector() {
    return this.http.get(`${environment.apiURL}/api/routes-sector`)
      .pipe(
        tap(
          (routes: any[]) => this.routesSector = routes
        )
      );
  }

  postRouteSector(routeSector: any) {
    return this.http.post(`${environment.apiURL}/api/routes-sector`, routeSector)
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }

  putRouteSector(routeSector: any) {
    return this.http.put(`${environment.apiURL}/api/routes-sector/${routeSector._id}`, routeSector)
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }

  deleteRouteSector(_id: string) {
    return this.http.delete(`${environment.apiURL}/api/routes-sector/${_id}`)
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }
}
