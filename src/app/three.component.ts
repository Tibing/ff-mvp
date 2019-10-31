import { Component, OnInit } from '@angular/core';
import { Substitutable } from 'ff';

import { OneService } from './one.service';

@Substitutable
@Component({
  selector: 'app-lazy',
  template: `lazy three`,
})
export class LazyThreeComponent implements OnInit {
  constructor(private service: OneService) {
  }

  ngOnInit() {
    this.service.log('lazy three');
  }
}
