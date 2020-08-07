export class Inmueble {
  constructor(
    public id: string,
    public address: string,
    public customer: string,
    public contacto: string,
    // tslint:disable-next-line:variable-name
    public postal_code: string,
    public fullName: string,
    public city: string,
    public state: string,
    public obs?: string,
    public descripcion?: string,
    public phone?: string,
    public country?: string,
    // tslint:disable-next-line:variable-name
    public camuzzi_id?: string,
    // tslint:disable-next-line:variable-name
    public muni_id?: string,
    // tslint:disable-next-line:variable-name
    public coop_id?: string,
    // tslint:disable-next-line:variable-name
    public camuzzi_share?: string,
    // tslint:disable-next-line:variable-name
    public coop_share?: string,
    // tslint:disable-next-line:variable-name
    public muni_share?: string,
    public publica?: string,
    public status?: string,
    public cliente?: string,
    public uuid?: string,
    public img?: string,
    public _id?: string
  ) {}
}
