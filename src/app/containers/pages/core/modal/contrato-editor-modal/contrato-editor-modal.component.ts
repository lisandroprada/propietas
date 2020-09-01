import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ContratosService } from "src/app/services/contratos.service";
import { CadenasService } from "src/app/services/cadenas.service";
import { NumLetrasService } from "src/app/services/num-letras.service";
import * as palabras from "src/app/data/diccionario.json";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-contrato-editor-modal",
  templateUrl: "./contrato-editor-modal.component.html",
  styleUrls: ["./contrato-editor-modal.css"],
})
export class ContratoEditorModalComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modal-xl",
  };
  forma: FormGroup;

  contratoModelo = "";
  contrato: any = "";
  diccionario: any = (palabras as any).default;
  contratoHTML = "";

  id = "";

  modalRef: BsModalRef;

  @ViewChild("template", { static: true }) template: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private _contratoService: ContratosService,
    private _cadena: CadenasService,
    private _numLetra: NumLetrasService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarContratoModelo();
  }

  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      editor: [],
    });
  }

  cargarFormulario() {
    const datos = this.contrato;
    let cambio = "";
    // const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const moneda = {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    };
    const fechaAlta = moment(datos.fecha_alta);

    const fechaComienzo = moment(datos.fecha_inicio);
    const fechaFinalizacion = moment(datos.fecha_inicio);
    const montoTotal = Number(datos.data.amount_month) * Number(datos.duracion);

    // Género y número
    const locadoresNG = datos.locadores;
    const locatariosNG = datos.locatarios;
    const fiadoresNG = datos.fiadores;

    const isLocador2 = datos.locador2.length > 2;
    const isLocatario2 = datos.locatario2.length > 2;
    const isFiador2 = datos.fiador2.length > 2;

    cambio = isLocador2
      ? this._cadena.stringInject(this.contratoModelo, {
          locadorAdicional: this.diccionario.locadorAdicional,
        })
      : this._cadena.stringInject(this.contratoModelo, {
          locadorAdicional: " ",
        });
    this.contratoModelo = cambio;
    cambio = isLocatario2
      ? this._cadena.stringInject(this.contratoModelo, {
          locatarioAdicional: this.diccionario.locatarioAdicional,
        })
      : this._cadena.stringInject(this.contratoModelo, {
          locatarioAdicional: " ",
        });
    this.contratoModelo = cambio;
    cambio = isFiador2
      ? this._cadena.stringInject(this.contratoModelo, {
          fiadorAdicional: this.diccionario.fiadorAdicional,
        })
      : this._cadena.stringInject(this.contratoModelo, {
          fiadorAdicional: " ",
        });
    this.contratoModelo = cambio;

    const data = {
      // Nombres
      locadorNombre: datos.locador,
      locadorNombre2: isLocador2 ? datos.locador2 : "",
      locatarioNombre: datos.locatario,
      locatarioNombre2: isLocatario2 ? datos.locatario2 : "",
      fiadorNombre: datos.fiador,
      fiadorNombre2: isFiador2 ? datos.fiador2 : "",

      // DNI
      locadorDNI: datos.locador_data.identityCard,
      locatarioDNI: datos.locatario_data.identityCard,
      fiadorDNI: datos.fiador_data.identityCard,
      locadorDNI2: isLocador2 ? datos.locador_data2.identityCard : "",
      locatarioDNI2: isLocatario2 ? datos.locatario_data2.identityCard : "",
      fiadorDNI2: isFiador2 ? datos.fiador_data2.identityCard : "",

      // Direccion
      locadorDireccion: datos.locador_data.addressLine1,
      locatarioDireccion: datos.locatario_data.addressLine1,
      fiadorDireccion: datos.fiador_data.addressLine1,
      locadorDireccion2: isLocador2 ? datos.locador_data2.addressLine1 : "",
      locatarioDireccion2: isLocatario2
        ? datos.locatario_data2.addressLine1
        : "",
      fiadorDireccion2: isFiador2 ? datos.fiador_data2.addressLine1 : "",

      // Propiedad
      inmuebleDireccion: datos.propiedad,
      inmuebleDetalle: datos.propiedadDetalle,

      // Datos del contrato
      plazoMeses: this._numLetra.numeroALetras(datos.duracion).toUpperCase(),

      montoTotalNumero: montoTotal.toLocaleString("es-AR", moneda),
      montoAlquilerNumero: Number(datos.data.amount_month).toLocaleString(
        "es-AR",
        moneda
      ),

      depositoGarantiaLetra: this._numLetra
        .numeroALetras(datos.data.amount_month)
        .toUpperCase(),
      depositoGarantiaNumero: Number(datos.data.amount_month).toLocaleString(
        "es-AR",
        moneda
      ),

      montoTotalLetras: this._numLetra.numeroALetras(montoTotal).toUpperCase(),
      montoAlquilerLetras: this._numLetra
        .numeroALetras(datos.data.amount_month)
        .toUpperCase(),

      fechaAlta: fechaAlta.locale("es").format("dddd, D [de] MMMM [de] YYYY"),
      fechaComienzo: fechaComienzo
        .locale("es")
        .format("dddd, D [de] MMMM [de] YYYY"),
      mesInicioLetra: this.capitalize(
        fechaComienzo.locale("es").format("dddd, MMMM Do YYYY")
      ),

      fechaBase: fechaComienzo
        .locale("es")
        .format("dddd, D [de] MMMM [de] YYYY"),
      fechaUno: fechaComienzo
        .add(1, "year")
        .locale("es")
        .format("dddd, D [de] MMMM [de] YYYY"),
      fechaDos: fechaComienzo
        .add(1, "years")
        .locale("es")
        .format("dddd, D [de] MMMM [de] YYYY"),

      fechaFinalizacion: fechaFinalizacion
        .subtract(1, "days")
        .add(3, "years")
        .locale("es")
        .format("dddd, D [de] MMMM [de] YYYY"),
      diaMesInicio: fechaComienzo.format("D"),
      diaInicioNumero: fechaComienzo.format("D"),
      diaGraciaNumero: fechaComienzo
        .add(datos.data.payment_term, "days")
        .format("D"),
      cbuBanco: "0340362200362003967004",
      banco: "Banco PATAGONIA S.A.",
      domicilioPago: "Gregorio Mayo 106 de la ciudad de Rawson",
      interesDiario: Number(datos.data.interest) / 10,
      inmobiliariaCiudad: "Rawson, Provincia del Chubut",

      // Articulos personas
      elLocador: this.buscaPalabra("el", datos.locador_genero),
      elLocador2: isLocador2
        ? this.buscaPalabra("el", datos.locador_genero2)
        : "",
      elLocatario: this.buscaPalabra("el", datos.locatario_genero),
      elLocatario2: isLocatario2
        ? this.buscaPalabra("el", datos.locatario_genero2)
        : "",
      elFiador: this.buscaPalabra("el", datos.fiador_genero),
      elFiador2: isFiador2 ? this.buscaPalabra("el", datos.fiador_genero2) : "",

      // Articulos genéricos

      elLocadorG: this.buscaPalabra("el", locadoresNG, true),
      elLocatarioG: this.buscaPalabra("el", locatariosNG, true),
      elFiadorG: this.buscaPalabra("el", fiadoresNG, true),

      alLocador: this.buscaPalabra("al", datos.locador_genero, true),
      alLocatario: this.buscaPalabra("al", datos.locatario_genero, true),
      delLocador: this.buscaPalabra("del", datos.locador_genero, true),
      delLocatario: this.buscaPalabra("del", datos.locatario_genero, true),

      artLocador: this.buscaPalabra("el", locadoresNG, true),
      artLocatario: this.buscaPalabra("el", locatariosNG, true),
      artFiador: this.buscaPalabra("el", fiadoresNG, true),
      locador: this.buscaPalabra("locador", locadoresNG, true),
      locatario: this.buscaPalabra("locatario", locatariosNG, true),
      fiador: this.buscaPalabra("fiador", fiadoresNG, true),

      // Titulos Personas
      tituloLocador: this.buscaPalabra("señor", datos.locador_genero),
      tituloLocatario: this.buscaPalabra("señor", datos.locatario_genero),
      tituloFiador: this.buscaPalabra("señor", datos.fiador_genero),
      tituloLocador2: isLocador2
        ? this.buscaPalabra("señor", datos.locador_genero2)
        : "",
      tituloLocatario2: isLocatario2
        ? this.buscaPalabra("señor", datos.locatario_genero2)
        : "",
      tituloFiador2: isFiador2
        ? this.buscaPalabra("señor", datos.fiador_genero2)
        : "",

      // Emails
      locadorEmail: datos.locador_data.email,
      locadorEmail2: isLocador2 ? datos.locador_data.email : "",
      locatarioEmail: datos.locatario_data.email,
      locatarioEmail2: isLocatario2 ? datos.locatario_data.email : "",
      fiadorEmail: datos.fiador_data.email,
      fiadorEmail2: isFiador2 ? datos.fiador_data.email : "",

      // Localidades
      locadorCiudad: "Rawson",
      locatarioCiudad: "Rawson",
      fiadorCiudad: "Rawson",
      inmuebleCiudad: "Rawson",
      locadorCiudad2: "Rawson",
      locatarioCiudad2: "Rawson",
      fiadorCiudad2: "Rawson",

      // Verbos
      daLocador: this.buscaVerbo("da", datos.locador_genero),
      esteLocador: this.buscaPalabra("este", locadoresNG),
      habilitadoLocador: this.buscaPalabra("habilitado", locadoresNG),
      requieraLocador: this.buscaVerbo("requiera", datos.locador_genero),
      quedaLocador: this.buscaVerbo("queda", datos.locador_genero),
      podráLocador: this.buscaVerbo("podrá", datos.locador_genero),
      indiqueLocador: this.buscaVerbo("indique", datos.locador_genero),
      tomeLocador: this.buscaVerbo("tome", datos.locador_genero),
      tendraLocatario: this.buscaVerbo("tendrá", datos.locatario_genero),
      declaraLocatario: this.buscaVerbo("declara", datos.locatario_genero),
      entregaraLocatario: this.buscaVerbo("entregara", datos.locatario_genero),
      abonaraLocatario: this.buscaVerbo("abonara", datos.locatario_genero),
      deberáLocatario: this.buscaVerbo("deberá", datos.locatario_genero),
      devuelvaLocatario: this.buscaVerbo("devuelva", datos.locatario_genero),
      responderáLocatario: this.buscaVerbo(
        "responderá",
        datos.locatario_genero
      ),
      recibeLocatario: this.buscaVerbo("recibe", datos.locatario_genero),
      comprometeLocatario: this.buscaVerbo(
        "compromete",
        datos.locatario_genero
      ),
      reconoceLocatario: this.buscaVerbo("reconoce", datos.locatario_genero),
      obligaLocatario: this.buscaVerbo("obliga", datos.locatario_genero),
      hiciereLocatario: this.buscaVerbo("hiciere", datos.locatario_genero),
      contraeLocatario: this.buscaVerbo("contrae", datos.locatario_genero),
      entregaLocatario: this.buscaVerbo("entrega", datos.locatario_genero),
      notificareLocatario: this.buscaVerbo(
        "notificare",
        datos.locatario_genero
      ),
      dieseLocatario: this.buscaVerbo("diese", datos.locatario_genero),
      leLocatario: this.buscaVerbo("le", datos.locatario_genero),

      interiorizadoFiador: this.buscaPalabra("interiorizado", fiadoresNG),
      lisoFiador: this.buscaPalabra("liso", fiadoresNG),
      llanoFiador: this.buscaPalabra("llano", fiadoresNG),
      solidarioFiador: this.buscaPalabra("solidario", fiadoresNG),
      pagadorFiador: this.buscaPalabra("pagador", fiadoresNG),
      constituyeFiador: this.buscaVerbo("constituye", datos.fiador_genero),
      contraeFiador: this.buscaVerbo("contrae", datos.fiador_genero),
      llegaseFiador: this.buscaVerbo("llegase", datos.fiador_genero),

      mes: this.buscaPalabraNum("mes", "p", true),
      peso: this.buscaPalabraNum("peso", "p", true),
      c1: "PRIMERA",
      c2: "SEGUNDA",
      c3: "TERCERA",
      c4: "CUARTA",
      c5: "QUINTA",
      c6: "SEXTA",
      c7: "SEPTIMA",
      c8: "OCTAVA",
      c9: "NOVENA",
      c10: "DECIMA",
      c11: "DECIMO PRIMERA",
      c12: "DECIMO SEGUNDA",
      c13: "DECIMO TRECERA",
      c14: "DECIMO CUARTA",
      c15: "DECIMO QUINTA",
      c16: "DECIMO SEXTA",
      c17: "DECIMO SEPTIMA",
      c18: "DECIMO OCTAVA",
      c19: "DECIMO NOVENA",
      c20: "VIGÉSIMA",
    };

    const str = this._cadena.stringInject(this.contratoModelo, data);
    this.contratoHTML = str;
    this.forma.reset({
      editor: str,
    });
  }

  cargarContratoModelo() {
    let i = 0;
    let contratoTexto = "";
    this._contratoService.getContratoModelo().subscribe((data: any) => {
      for (i = 0; i < data.contratoModelo.length; i++) {
        contratoTexto += data.contratoModelo[i].texto;
      }
      this.contratoModelo = contratoTexto;
      // console.log(this.contratoModelo);
      this.cargarContratoData();
    });
  }

  cargarContratoData() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });

    this._contratoService.getContrato(this.id).subscribe((data: any) => {
      this.contrato = data;
      this.cargarFormulario();
    });
  }

  buscaPalabra(termino, numGen, caps?) {
    if (numGen[1] === "") {
      let res = this.diccionario[termino].numero[numGen[0]];
      if (caps) {
        res = res.toUpperCase();
      }
      return res;
    } else {
      let res = this.diccionario[termino].numero[numGen[0]][numGen[1]];
      if (caps) {
        res = res.toUpperCase();
      }
      return res;
    }
  }

  buscaVerbo(termino, numGen, caps?) {
    const res = this.diccionario[termino].numero[numGen[0]];
    if (caps) {
      return res.toUpperCase();
    }
    return res;
  }

  buscaPalabraNum(termino, num, caps?) {
    const res = this.diccionario[termino].numero[num];
    if (caps) {
      return res.toUpperCase();
    }
    return res;
  }

  capitalize = (s) => {
    if (typeof s !== "string") {
      return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  addDays(n: number) {
    const t = new Date();
    t.setDate(t.getDate() + n);
    let month = "0" + (t.getMonth() + 1);
    let date = "0" + t.getDate();
    month = month.slice(-2);
    date = date.slice(-2);
    date = t.getFullYear() + "-" + month + "-" + date;
  }

  onSubmit() {}
}
