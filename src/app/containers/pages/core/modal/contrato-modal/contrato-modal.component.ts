import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, switchMap } from "rxjs/operators";
import { InmuebleService } from "src/app/services/inmueble.service";
import { NgSelectConfig } from "@ng-select/ng-select";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-contrato-modal",
  templateUrl: "./contrato-modal.component.html",
  styles: [],
})
export class ContratoModalComponent implements OnInit {
  forma: FormGroup;
  minDate: Date;
  bsValue = new Date();

  inmuebles: any = [];
  clientes: any = [];
  typeaheadInmueble = new EventEmitter<string>();
  typeaheadCliente = new EventEmitter<string>();

  direccion = "";

  icon = "iconsminds-home";
  title = "Disponible";
  detail = "Seleccione inmueble";
  progess = false;
  progressText = "25%";
  percent = 25;
  price = 50;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-xl",
  };

  @ViewChild("template", { static: true }) template: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _inmuebleService: InmuebleService,
    private _clienteService: ClienteService,
    private ngConfig: NgSelectConfig
  ) {
    this.ngConfig.typeToSearchText = "Escriba un nombre";
    this.ngConfig.notFoundText = "No encontrado";

    this.obtieneInmuebles();
    this.obtieneClientes();
    this.crearFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.forma = this.fb.group({
      inmueble: [null],
      tipoContrato: ["Vivienda"],
      locador: [null],
      locatario: [null],
      fiador: [null],
      duracion: ["36"],
      monto: [0],
      montoActualizacion: [{ value: "", disabled: true }],
      periodoActualizacion: [{ value: "12", disabled: true }],
      honorarioLocador: [0],
      cuotasHonorarioLocador: [1],
      honorarioLocatario: [0],
      cuotasHonorarioLocatario: [1],
      administracion: [""],
      administracionMonto: [""],
      depositoGarantia: [{ value: "", disabled: true }],
      cuotasDepositoGarantia: [1],
      fechaInicio: [this.bsValue],
      diasGracia: [""],
      consorcio: [""],
    });
  }

  obtieneInmuebles() {
    this.typeaheadInmueble
      .pipe(
        debounceTime(200),
        switchMap((term) => this._inmuebleService.getInmuebles(10, 1, term))
      )
      .subscribe(
        (items: any) => {
          this.inmuebles = items.inmuebles;
          this.cd.markForCheck();
        },
        (err) => {
          this.inmuebles = [];
          this.cd.markForCheck();
        }
      );
  }

  obtieneClientes() {
    this.typeaheadCliente
      .pipe(
        debounceTime(200),
        switchMap((term) => this._clienteService.getClientes(10, 1, term))
      )
      .subscribe(
        (items: any) => {
          this.clientes = items.clientes;
          this.cd.markForCheck();
        },
        (err) => {
          this.clientes = [];
          this.cd.markForCheck();
        }
      );
  }

  onChange(selected) {
    console.log(selected);
    this.direccion = selected.address;
    this.bsValue = new Date();
    this.minDate = new Date(selected.disponibleFecha);
  }

  onChangeTipoContrato(selected) {
    if (selected.target.value === "Comercial") {
      this.forma.controls["montoActualizacion"].enable();
      this.forma.controls["periodoActualizacion"].enable();
    } else {
      this.forma.controls["montoActualizacion"].disable();
      this.forma.controls["periodoActualizacion"].disable();
    }
  }
  onChangeMonto(monto) {
    // this.forma.patchValue({
    //   honorarioLocador: [this.forma.value.monto],
    //   honorarioLocatario: [this.forma.value.monto],
    // });
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  onSubmit() {}
}
