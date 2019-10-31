import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OneComponent } from './one.component';
import { activateFeature, flag } from './feature-flag';
import { TwoComponent } from './two.component';
import { TwoService } from './two.service';
import { OneService } from './one.service';

flag('two components', [
  [OneComponent, TwoComponent],
]);
activateFeature('two components');
flag('two services', [
  [OneService, TwoService],
]);

activateFeature('two services');

@NgModule({
  declarations: [
    AppComponent,
    OneComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
