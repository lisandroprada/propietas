import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalizacionService {

  constructor( private http: HttpClient ) {  }

  getProvincia() {
    const url = environment.apiUrlLocal + '/ubicacion';

    return this.http.get(url)
      .pipe(
        map( (res: any) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
   }

  getCiudad(iso: string) {
    const url = environment.apiUrlLocal + '/ubicacion/buscar/' + iso;
    return this.http.get(url)
      .pipe (
        map ((resp: any) => {
        return resp;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

}
