import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


export interface ClienteResponse {
  data: Cliente[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {

  constructor(private http: HttpClient) { }

 getClientes(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = '') {
   const url = environment.apiUrlLocal + '/cliente';
   let params = new HttpParams();
   params = params.append('pageSize', pageSize + '');
   params = params.append('curentPage', currentPage + '');
   params = params.append('search', search);
   params = params.append('orderBy', orderBy);

   return this.http.get(url, {params})
    .pipe(
      map( (res: ClienteResponse) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
 }

}
