import { Component, OnInit } from '@angular/core';
import { OneService } from './one.service';

@Component({
  selector: 'app-one',
  template: `two`,
})
export class TwoComponent implements OnInit {
  constructor(private service: OneService) {
  }

  ngOnInit() {
    this.service.log('two');
  }
}
