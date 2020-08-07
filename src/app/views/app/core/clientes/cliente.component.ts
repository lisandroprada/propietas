import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalizacionService } from '../../../../services/localizacion.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  id: string;
  cliente = new Cliente('', '', '', '');
  data: Cliente = new Cliente('', '', '', '', '', '', '', '');
  state = [];
  city = [];


  forma: FormGroup;

  isLoading: boolean;


  constructor( private _activatedRoute: ActivatedRoute,
               private _clienteService: ClienteService,
               private _localizacion: LocalizacionService,
               private fb: FormBuilder) {
    _activatedRoute.params.subscribe( params => { this.id = params.id; });
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
    });
  }

  loadLocalidades(iso) {
    this._localizacion.getCiudad(iso)
      .subscribe( data => {
        this.city = data.localidades[0].localidad;
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
    this._clienteService.getCliente(this.id)
    .subscribe( data => {
        this.data = data.clientes;
        this.cargarDataFormulario();
    },
    error => {
      this.isLoading = false;
    }
    );
  }

  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

  cargarDataFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      customerName: this.data.customerName,
      customerLastName: this.data.customerLastName,
      addressLine1: this.data.addressLine1,
      identityCard: this.data.identityCard,
      tax_id: this.data.tax_id,
      iva: this.data.iva,
      phone: this.data.phone,
      mobilephone: this.data.mobilephone,
      email: this.data.email,
      state: this.data.state,
      city: this.data.city,
      gender: this.data.gender
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      customerName: ['', Validators.required],
      customerLastName: ['',  Validators.required],
      gender: ['', Validators.required],
      identityCard: [''],
      iva: [''],
      phone: [''],
      mobilephone: [''],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      addressLine1: [''],
      city: [''],
      state: [''],
      tax_id: ['']
    });

  }

  // Get formControl
  get customerNameInv() {
    return this.forma.get('customerName').invalid && this.forma.get('customerName').touched;
  }
  get customerLastNameInv() {
    return this.forma.get('customerLastName').invalid && this.forma.get('customerLastName').touched;
  }
  get addressLine1Inv() {
    return this.forma.get('addressLine1').invalid && this.forma.get('addressLine1').touched;
  }
  get genderInv() {
    return this.forma.get('gender').invalid && this.forma.get('gender').touched;
  }
  get emailInv() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }


  onSubmit() {

    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }

    this._clienteService.updateCliente(this.forma.value, this.id)
    .subscribe( resp => {
      this.loadData();
    });
  }

  cancelar() {
    this.loadData();
  }
}
