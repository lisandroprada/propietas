export class Cliente {
  constructor(
      public customerName: string,
      public customerLastName: string,
      public identityCard: string,
      public id: string,
      public _id?: string
  ) {}
}
