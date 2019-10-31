import { Component, OnInit } from '@angular/core';
import { Substitutable } from './feature-flag';
import { OneService } from './one.service';

@Substitutable
@Component({
  selector: 'app-one',
  template: `one`,
})
export class OneComponent implements OnInit {
  constructor(private service: OneService) {
  }

  ngOnInit() {
    this.service.log('one');
  }
}
