import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contrato-modal',
  templateUrl: './contrato-modal.component.html',
  styles: [
  ]
})
export class ContratoModalComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };

  @ViewChild('template', { static: true }) template: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }
}
