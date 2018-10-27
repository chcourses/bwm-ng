import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

import { MAP } from '../../../server/config/dev.js';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: MAP
    })
  ],
  exports: [
    MapComponent
  ],
  declarations: [
    MapComponent
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }
