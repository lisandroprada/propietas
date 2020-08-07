export class Contrato {
  constructor(
    public contrato: string,
    public tipo: string,
    public duracion: string,
    public estado: string,
    public fechaAlta: string,
    public fechaInicio: string,
    public inmuebleDireccion: string,
    public locatario: string,
    public locador: string,
    public fiador: string,
    public montoAlquiler: string,
    public montoActualizacion: string,
    public periodoActualizaciom: string,
    public interesMora: string,
    public administracion: string,
    public usuario: string,
    public _id?: string
  ) {}
}
