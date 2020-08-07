import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {
  transform(img: any, tipo: string): any {

    let url = environment.apiUrlLocal;
    if (!img) {
      return url + '/imagen/' + tipo + '/' + 'img';
    }

    if ( img.indexOf('https') >= 0) {

      return img;
      }

    switch ( tipo ) {

        case 'cliente':
          url += '/imagen/clientes/' + img;
          break;
        // case 'medico':
        //    url += '/medicos/' + img;
        //    break;
        // case 'hospital':
        //    url += '/hospitales/' + img;
        //    break;

        default:
          console.log('tipo de imagen no existe.');
          url += '/imagen/cliente/xxx';
      }
    return url;

    }
}
