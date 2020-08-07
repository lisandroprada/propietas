import { Component, OnInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, catchError, debounceTime } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface Person {
  id: number;
  fullName: string;
}

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html'
})
export class BlankPageComponent implements OnInit {

  clientes: [{ fullName: 'Lucas Pablo Nievas', _id: '5ef9635f0f837afd6b10a67a' }, {fullName: 'Emiliano Prada Toledo', _id: '5ef9635f0f837afd6b10a7ff'}];
  items = [];
  typeahead = new EventEmitter<string>();
  termino = '';


  people$: Observable<any[]>;
  selectedPeople = [{ fullName: 'Lucas Pablo Nievas', _id: '5ef9635f0f837afd6b10a67a' }, {fullName: 'Emiliano Prada Toledo', _id: '5ef9635f0f837afd6b10a7ff'}];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {

    this.typeahead
      .pipe(
          debounceTime(200),
          switchMap(term => {
            this.termino = term;
            return this.getClientes(10, 1, term);
          })
      )
      .subscribe(items => {
          this.items = items;
          this.cd.markForCheck();
      }, (err) => {
          console.log('error', err);
          this.items = [];
          this.cd.markForCheck();
      });
  }

  ngOnInit() {
    this.people$ = this.getClientes();
  }

  getClientes(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''): Observable<any[]> {
    const url = environment.apiUrlLocal + '/cliente';
    let params = new HttpParams();
    params = params.append('pageSize', pageSize + '');
    params = params.append('currentPage', currentPage + '');
    params = params.append('search', search);
    params = params.append('orderBy', orderBy);

    return this.http.get<any>(url, { params })
      .pipe(
        map((rsp => rsp.clientes)),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  clearModel() {
    this.selectedPeople = [];
  }

  changeModel() {
    this.selectedPeople = [{ fullName: 'New person', _id: '' }];
  }



}
