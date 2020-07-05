export class Cliente {
  constructor(
      public fullName: string,
      public customerName: string,
      public customerLastName: string,
      public phone: string,
      public email?: string,
      public identityCard?: string,
      public id?: string,
      public _id?: string
  ) {}
}
