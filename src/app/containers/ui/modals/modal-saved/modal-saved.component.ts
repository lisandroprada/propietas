import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-saved',
  templateUrl: './modal-saved.component.html',
  styles: [
  ]
})
export class ModalSavedComponent {
  modalRef: BsModalRef;
  message: string;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Registro guardado!';
    this.modalRef.hide();
  }
}
