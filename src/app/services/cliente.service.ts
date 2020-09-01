import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

export interface ClienteResponse {
  clientes: Cliente[];
  data: Cliente[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: "root" })
export class ClienteService {
  constructor(private http: HttpClient) {}

  getClientes(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = "",
    orderBy: string = ""
  ): Observable<any[]> {
    const url = environment.apiUrlLocal + "/clientes/prueba";
    let params = new HttpParams();
    params = params.append("pageSize", pageSize + "");
    params = params.append("currentPage", currentPage + "");
    params = params.append("search", search);
    params = params.append("orderBy", orderBy);

    return this.http
      .get<any>(url, { params })
      .pipe(
        map((res) => res),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  getCliente(id: string) {
    const url = environment.apiUrlLocal + "/cliente/" + id;

    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  postClientes(cliente: Cliente) {
    const url = environment.apiUrlLocal + "/cliente";
    return this.http.post(url, { cliente }).pipe(
      map((res: Cliente) => {
        return res;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  updateCliente(cliente: Cliente, id: string) {
    // return;
    const url = environment.apiUrlLocal + "/cliente/" + id;
    return this.http.put(url, { cliente }).pipe(
      map((res: ClienteResponse) => {
        return res;
      })
    );
  }
}
