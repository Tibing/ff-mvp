import { Injectable } from '@angular/core';
import { Substitutable } from './feature-flag';

@Substitutable
@Injectable({ providedIn: 'root' })
export class OneService {

  constructor() {
  }

  log(name: string) {
    console.log('hi ', name);
  }
}
