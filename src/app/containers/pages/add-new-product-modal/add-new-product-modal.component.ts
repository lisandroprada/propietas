import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product-modal',
  templateUrl: './add-new-product-modal.component.html',
  styles: []
})
export class AddNewProductModalComponent implements OnInit {

  cliente = new Cliente('', '', '', '', '', '', '', '', '', '');

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  categories = [
    { label: 'Alta de cliente', value: 'newCliente' },
    { label: 'Consulta por alquiler', value: 'consultaAlquiler' },
    { label: 'Consulta por compra', value: 'consultaCompra' }
  ];

  forma: FormGroup;


  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private fb: FormBuilder,
              private _clienteService: ClienteService,
              private router: Router) {

  this.crearFormulario();

  }

  ngOnInit() {}

  get customerNameInv() {
    return this.forma.get('customerName').invalid && this.forma.get('customerName').touched;
  }
  get customerLastNameInv() {
    return this.forma.get('customerLastName').invalid && this.forma.get('customerLastName').touched;
  }
  get emailInv() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }
  get phoneInv() {
    return this.forma.get('phone').invalid && this.forma.get('phone').touched;
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      customerName: ['', Validators.required],
      customerLastName: ['',  Validators.required],
      identityCard: [''],
      phone: ['', Validators.required],
      email: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
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

    // Posteo de información
    // this.forma.reset({
    //       nombre: 'Sin nombre'
    //     });

    this.cliente = this.forma.value;

    this._clienteService.postClientes(this.cliente)
      .subscribe(  (resCliente) => {
        const cliente = resCliente as any['cliente'];
        console.log( resCliente );
        this.modalRef.hide();
        this.router.navigate(['/app/core/cliente', cliente.cliente._id]);
      });
  }
}


