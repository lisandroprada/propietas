export class Cliente {
  constructor(
      public fullName: string,
      public customerName: string,
      public customerLastName: string,
      public addressLine1?: string,
      public gender?: string,
      public phone?: string,
      public mobilephone?: string,
      public city?: string,
      public state?: string,
      public email?: string,
      public identityCard?: string,
      // tslint:disable-next-line:variable-name
      public tax_id?: string,
      public iva?: string,
      public img?: string,
      public id?: string,
      public _id?: string
  ) {}
}
