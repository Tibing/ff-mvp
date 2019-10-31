import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { activeFeaturesLoader, flag } from 'ff';

import { AppComponent } from './app.component';
import { OneComponent } from './one.component';
import { TwoComponent } from './two.component';
import { TwoService } from './two.service';
import { OneService } from './one.service';
import { RouterModule } from '@angular/router';
import { LazyComponent } from './lazy.module';
import { LazyThreeComponent } from './three.component';

flag('one', [
  [OneComponent, TwoComponent],
  [LazyComponent, LazyThreeComponent],
]);
flag('two', [
  [OneService, TwoService],
]);

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'child',
        loadChildren: () => import('./lazy.module').then(mod => mod.LazyModule),
      },
    ]),
  ],
  providers: [
    activeFeaturesLoader(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
