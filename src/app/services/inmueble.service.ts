import { Inmueble } from 'src/app/models/inmueble';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InmuebleResponse {
  inmuebles: Inmueble[];
  data: Inmueble[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private http: HttpClient) { }

  getInmuebles(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = '') {
    const url = environment.apiUrlLocal + '/inmueble';
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    return this.http.get(url, { params })
      .pipe(
        map((res: InmuebleResponse) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );

    }


  getInmueble(id: string) {
    const url = environment.apiUrlLocal + '/inmueble/' + id;

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

  postInmuebless(inmueble: Inmueble) {
    const url = environment.apiUrlLocal + '/inmueble';
    return this.http.post(url, {inmueble})
      .pipe(map ((res: Inmueble ) => {
        return res;
      }),
      catchError( errorRes => {
        return throwError(errorRes);
      })
    );
    }

    updateInmueble(inmueble: Inmueble, id: string) {
      const url = environment.apiUrlLocal + '/inmueble/' + id;
      return this.http.put(url, {inmueble})
        .pipe(map((res: InmuebleResponse) => res)
        );
    }
}
