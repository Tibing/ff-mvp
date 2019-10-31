import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Substitutable } from 'ff';


@Substitutable
@Component({
  selector: 'app-lazy',
  template: `lazy`,
})
export class LazyComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LazyComponent,
      },
    ]),
  ],
  exports: [],
  declarations: [LazyComponent],
  providers: [],
})
export class LazyModule {
}
