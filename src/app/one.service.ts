import { Injectable } from '@angular/core';
import { Substitutable } from 'ff';

@Substitutable
@Injectable({ providedIn: 'root' })
export class OneService {

  constructor() {
  }

  log(name: string) {
    console.log('hi ', name);
  }
}
