import { ContratoEditorModalComponent } from 'src/app/containers/pages/core/modal/contrato-editor-modal/contrato-editor-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContratosService } from 'src/app/services/contratos.service';

@Component({
  selector: 'app-contrato-editor',
  templateUrl: './contrato-editor.component.html',
  styles: [
  ]
})
export class ContratoEditorComponent implements OnInit {

  forma: FormGroup;
  persona = 'Lisandro Prada';
  blurred = false;
  focused = false;
  contrato = '';

  @ViewChild('addNewModalRef', { static: true }) addNewModalRef: ContratoEditorModalComponent;

  constructor(private fb: FormBuilder,
              private _contratoService: ContratosService) {
   }

  ngOnInit(): void {
    this.crearFormulario();
    this._contratoService.getContrato()
      .subscribe( data => {
        this.contrato = data;
        // console.log(this.contrato);
      });
  }

  crearFormulario() {
    // this.forma = this.fb.group({
    //   editor: [this.persona]
    // });
  }

  cargarFormulario() {
  }

  onSubmit() {}

  showAddNewModal() {
    this.addNewModalRef.show();
  }
}
