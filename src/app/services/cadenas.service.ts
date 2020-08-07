import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CadenasService {

  constructor() { }



  stringInject(str, data) {
    if (typeof str === 'string' && (data instanceof Array)) {

        return str.replace(/({\d})/g, (i) => {
            return data[i.replace(/{/, '').replace(/}/, '')];
        });
    } else if (typeof str === 'string' && (data instanceof Object)) {

        if (Object.keys(data).length === 0) {
            return str;
        }

        // tslint:disable-next-line:forin
        for (let key in data) {
            return str.replace(/({([^}]+)})/g, (i) => {
                let key = i.replace(/{/, '').replace(/}/, '');
                if (!data[key]) {
                    return i;
                }

                return data[key];
            });
        }
    } else if (typeof str === 'string' && data instanceof Array === false || typeof str === 'string' && data instanceof Object === false) {

            return str;
    }
    // else {

    //     return false;
    // }
  }

}
