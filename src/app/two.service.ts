import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TwoService {

  constructor() {
  }

  log(name: string) {
    console.log('two hi ', name);
  }
}
