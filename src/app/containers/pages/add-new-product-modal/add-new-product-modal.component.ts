import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-add-new-product-modal',
  templateUrl: './add-new-product-modal.component.html',
  styles: []
})
export class AddNewProductModalComponent implements OnInit {

  // cliente: Cliente = new Cliente('', '', '', '', '', '', '');

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
              private fb: FormBuilder) {

  this.crearFormulario();

  }

  ngOnInit() {

  }

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
    console.log(this.forma);
  }
}
