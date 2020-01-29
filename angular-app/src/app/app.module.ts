import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisualizationComponent } from './visualization/visualization.component';
import { AxesComponent } from './visualization/axes/axes.component';
import { AreaChartComponent } from './visualization/area-chart/area-chart.component';
import { AreaComponent } from './visualization/area-chart/area/area.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizationComponent,
    AxesComponent,
    AreaChartComponent,
    AreaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
