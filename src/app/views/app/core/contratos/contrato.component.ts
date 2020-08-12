import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { InmuebleService } from 'src/app/services/inmueble.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styles: [
  ]
})

export class ContratoComponent implements OnInit {

  forma: FormGroup;

  items: any = [];
  inmuebles: any = [];
  typeahead = new EventEmitter<string>();
  typeaheadInmueble = new EventEmitter<string>();


  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private _clienteService: ClienteService,
              private _inmuebleService: InmuebleService,
              private ngConfig: NgSelectConfig) {

                this.ngConfig.typeToSearchText = 'Escriba un nombre';
                this.ngConfig.notFoundText = 'No encontrado';

                this.obtieneClientes();
                this.obtieneInmuebles();
                this.crearFormulario();

              }

  ngOnInit(): void {
  }

  onSubmit() {}

  crearFormulario() {
    this.forma = this.fb.group({
      inmueble: [null],
      locador: [null],
      locatario: [null],
      fiador: [null],
      tipo: [''],
      duracion: [''],
      monto: [''],
      montoActualizacion: [''],
      periodoActualizacion: [''],
      honorarioLocador: [''],
      cuotasHonorarioLocador: [''],
      honorarioLocatario: [''],
      cuotasHonorarioLocatario: [''],
      administracion: [''],
      administracionMonto: [''],
      depositoGarantia: [''],
      cuotasDepositoGarantia: [''],
      fechaInicio: [''],
      diasGracia: [''],
      consorcio: ['']
    });
  }

  obtieneClientes() {
    this.typeahead.pipe(debounceTime(200), switchMap(term => this._clienteService.getClientes(10, 1, term)))
    .subscribe((items: any) => {
          this.items = items.clientes;
          this.cd.markForCheck();
    }, (err) => {
      this.items = [];
      this.cd.markForCheck();
    }
    );
  }

  obtieneInmuebles() {
    this.typeaheadInmueble.pipe(debounceTime(200), switchMap(term => this._inmuebleService.getInmuebles(10, 1, term)))
    .subscribe((items: any) => {
      this.inmuebles = items.inmuebles;
      this.cd.markForCheck();
    }, (err) => {
      this.inmuebles = [];
      this.cd.markForCheck();
    })
  }

}
