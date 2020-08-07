export interface ILeyenda {
  agente: string;
  data: {
    nombre: number,
    apellido: number,
    direccion: number,
    ciudad: number,
    provincia: number,
    dd: number,
    cuit: number,
    email: number,
    nombreCompleto: number
  };
}


const leyenda: ILeyenda[] = [
  {
    agente: 'locador',
    data: {
      nombre: 0,
      apellido: 1,
      direccion: 2,
      ciudad: 3,
      provincia: 4,
      dd: 5,
      cuit: 6,
      email: 7,
      nombreCompleto: 8
    }
  },
  {
    agente: 'locatario',
  data: {
    nombre: 9,
    apellido: 10,
    direccion: 11,
    ciudad: 12,
    provincia: 13,
    dd: 14,
    cuit: 15,
    email: 16,
    nombreCompleto: 17
  }}
, {
  agente: 'fiador',
  data:
  {
    nombre: 18,
    apellido: 19,
    direccion: 20,
    ciudad: 21,
    provincia: 22,
    dd: 23,
    cuit: 24,
    email: 25,
    nombreCompleto: 26
  }
}, {
  agente: 'fiador',
  data:
  {
    nombre: 18,
    apellido: 19,
    direccion: 20,
    ciudad: 21,
    provincia: 22,
    dd: 23,
    cuit: 24,
    email: 25,
    nombreCompleto: 26
  }
}
];

export default leyenda;


// ,
//     numeros : {
//       montoTotalContrato: 27,
//       montoCuota: 28,
//       montoHonorarios: 29,
//       numeroLetra: 30
//     },
//     fechas: {
//       fechaFirma: 30,
//       fechaInicio: 31,
//       fechaSegmento1: 32,
//       fechaSegmento2: 33,
//       fechaSegmento3: 34,
//       fechaSegmento4: 35,
//       fechaSegmento5: 36
//     },
//      agente: 'titulos',
//      data: {
//        locador: 37,
//        locatario: 38,
//        fiador: 39
//      },
//      agente: 'articulos',
//      data: {
//        la: 40,
//        el: 41,
//      },
//      agente: 'verbos',
//      data: {
//        da: 42,
//        declara: 43,
//        tendra: 44,
//        entregara: 45,
//        abonara: 46,
//        tome: 47,
//        recibe: 48,
//        compromete: 49,
//        respondera: 50
//      }
//   }
// ];




// titulos: {
//   femeninoSingular: 37,
//   femininoPlural: 38,
//   masculinoSingular: 39,
//   masculinoPlurar: 40,
//   mixto: 41
// },
// verbos:
// {
//   daSingular: 41,
//   daPlural: 42,
//   declaraSingular: 43,
//   declaraPlural: 44,
//   podraSingular: 45,
//   podraPlural: 46,
// }
