import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contrato } from '../models/contrato';

export interface ContratoResponse {

  contratos: Contrato[];
  data: Contrato[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: 'root' })
export class ContratosService {
  constructor(private http: HttpClient) { }

  getContratos(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''): Observable<any[]> {
    const url = environment.apiUrlLocal + '/contrato';
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    return this.http.get<any>(url, { params })
      .pipe(
        map((res => res)),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  getContrato() {
    const url = 'http://ipropietas.com.ar/SG_Propietas/informe/prorroga/ajax.php';
    let params = new HttpParams();
    params = params.append('uuid', '5f215e4ed3c11');
    return this.http.post(url, params )
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  getContratoModelo() {
    const url = environment.apiUrlLocal + '/contrato/modelo';
    let params = new HttpParams();
    params = params.append('search', 'vivienda');
    return this.http.get(url, {params})
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }
}
