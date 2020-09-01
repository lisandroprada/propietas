import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { switchMap, debounceTime } from "rxjs/operators";
import { ClienteService } from "src/app/services/cliente.service";
import { LocalizacionService } from "src/app/services/localizacion.service";
import { InmuebleService } from "src/app/services/inmueble.service";

@Component({
  selector: "app-inmueble-modal",
  templateUrl: "./inmueble-modal.component.html",
})
export class InmuebleModalComponent implements OnInit {
  clientes: any = [];
  typeaheadCliente = new EventEmitter<string>();
  state = [];
  city = [];
  inmuebles = [];

  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-xl",
  };

  forma: FormGroup;

  @ViewChild("template", { static: true }) template: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _clienteService: ClienteService,
    private _localizacion: LocalizacionService,
    private _inmuebleService: InmuebleService,
    private cd: ChangeDetectorRef
  ) {
    this.obtieneClientes();
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.loadProvincias();
    this.onChanges();
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      customer: ["", Validators.required],
      address: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  obtieneClientes() {
    this.typeaheadCliente
      .pipe(
        debounceTime(200),
        switchMap((term) => {
          if (term == null) term = "";
          return this._clienteService.getClientes(10, 1, term);
        })
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

  obtieneInmuebles(termino) {
    this._inmuebleService
      .getInmuebles(100, 1, termino, "")
      .subscribe((data) => {
        this.inmuebles = data.inmuebles;
        console.log(this.inmuebles);
      });
  }

  loadProvincias() {
    this._localizacion.getProvincia().subscribe((data) => {
      this.state = data.provincias;
    });
  }

  loadLocalidades(iso) {
    this._localizacion.getCiudad(iso).subscribe((data) => {
      this.city = data.localidades[0].localidad;
    });
  }

  onChanges(): void {
    this.forma.get("state").valueChanges.subscribe((val: any) => {
      this.loadLocalidades(val);
    });
  }

  onChangePropietario(selected) {
    console.log(selected);
    this.obtieneInmuebles(selected[0].fullName);
  }

  onSubmit() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control: any) => {
            return control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });
    }

    this._inmuebleService
      .postInmuebles(this.forma.value)
      .subscribe((res) => console.log(res));

    console.log(this.forma.value);
    console.log("Submited");
  }
}
