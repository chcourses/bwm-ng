import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAKBriqFE0TEToIAJ0ggG1jBlVEpPik-0M'
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
