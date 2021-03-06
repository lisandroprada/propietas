import { Cliente } from './../models/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ClienteResponse {
  clientes: Cliente[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  getProducts(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = '') {
    const url = environment.apiUrlLocal + '/cliente';
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    return this.http.get(url, { params })
      .pipe(
        map((res: ClienteResponse) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
