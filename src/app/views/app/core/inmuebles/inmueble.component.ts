import { Component, OnInit, EventEmitter, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InmuebleService } from '../../../../services/inmueble.service';
import { Inmueble } from '../../../../models/inmueble';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ClienteService } from 'src/app/services/cliente.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.component.html',
  styles: [
  ]
})
export class InmuebleComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  id: string;
  inmueble = new Inmueble('', '', '', '', '', '', '', '');
  data: Inmueble = new Inmueble('', '', '', '', '', '', '', '');
  state = [];
  city = [];
  items: any = [];
  typeahead = new EventEmitter<string>();
  termino = '';
  formulario = '';
  template: any = '';

  forma: FormGroup;

  constructor(private _route: ActivatedRoute,
              private _inmuebleService: InmuebleService,
              private _clienteService: ClienteService,
              private _localizacion: LocalizacionService,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private modalService: BsModalService) {
    _route.params.subscribe( params => { this.id = params.id; });
    this.typeahead.pipe(debounceTime(200), switchMap(term => {
      this.termino = term;
      return this._clienteService.getClientes(10, 1, term);
    })).subscribe((items: any) => {
          this.items = items.clientes;
          this.cd.markForCheck();
    }, (err) => {
      console.log('error', err);
      this.items = [];
      this.cd.markForCheck();
    }
    );

    this.crearFormulario();
   }

  ngOnInit(): void {
    this.loadProvincias();
    this.onChanges();
    this.loadData();
  }

  loadProvincias() {
    this._localizacion.getProvincia().subscribe( data => {
      this.state = data.provincias;
      // console.log(this.state);
    });
  }

  loadLocalidades(iso) {
    this._localizacion.getCiudad(iso)
      .subscribe( data => {
        this.city = data.localidades[0].localidad;
        // console.log(this.city);
        this.forma.patchValue({
          city: this.data.city
        });
      });
  }

  onChanges(): void {

    this.forma.get('state').valueChanges.subscribe( (val: any) => {
      this.loadLocalidades(val);
    });
  }

  loadData() {
    this._inmuebleService.getInmueble(this.id)
      .subscribe( data => {
        this.data = data.inmueble;
        // console.log(this.data);
        this.cargarDataFormulario();
      });
  }

   // Get formControl
   get addressInv() {
    return this.forma.get('address').invalid && this.forma.get('address').touched;
    }

  crearFormulario() {
    this.forma = this.fb.group({
      address: [''],
      state: [''],
      city: [''],
      contacto: ['']
    });
  }

  cargarDataFormulario() {
    this.forma.reset({
      address: this.data.address,
      state: this.data.state,
      city: this.data.city,
      contacto: this.data.contacto
    });
  }
  onSubmit() {
    this.formulario = this.forma.value;
    this._inmuebleService.updateInmueble(this.forma.value, this.id)
    .subscribe( resp => {
      this.loadData();
    });
  }

  cancelar() {
    this.loadData();
  }

  openModal(template: TemplateRef<any>) {
    // console.log('open modal');
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Registro grabado en la BD!';
    this.modalRef.hide();
  }
}
