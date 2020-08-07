import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map, tap, switchMap, distinctUntilChanged, catchError, debounceTime } from 'rxjs/operators';
import { of, Observable, Observer, noop } from 'rxjs';

interface GitHubUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
}



@Component({
  selector: 'app-inmueble-modal',
  templateUrl: './inmueble-modal.component.html'
})

export class InmuebleModalComponent implements OnInit {

  search: string;
  suggestions$: Observable<GitHubUser[]>;
  errorMessage: string;

  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };

  forma: FormGroup;

  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor( private fb: FormBuilder,
               private modalService: BsModalService,
               private http: HttpClient) {
                this.crearFormulario();

               }


               ngOnInit(): void {
                this.suggestions$ = new Observable((observer: Observer<string>) => {
                  observer.next(this.search);
                }).pipe(
                  switchMap((query: string) => {
                    if (query) {
                      // using github public api to get users by name
                      return this.http.get<GitHubUserSearchResponse>(
                        'https://api.github.com/search/users', {
                        params: { q: query }
                      }).pipe(
                        map((data: GitHubUserSearchResponse) => data && data.items || []),
                        tap(() => noop, err => {
                          // in case of http error
                          this.errorMessage = err && err.message || 'Something goes wrong';
                        })
                      );
                    }
                    return of([]);
                  })
                );
              }



  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      customer: ['', Validators.required],
      search: [''],
      address: ['',  Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( (control: any) => {
            return control.markAsTouched();
          } );
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.forma.value);
    console.log('Submited');
  }

}
