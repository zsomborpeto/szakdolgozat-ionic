import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StatsPageRoutingModule } from "./stats-routing.module";
import { TrafficChartModule } from "../traffic-chart/traffic-chart.module";

import { StatsPage } from "./stats.page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatsPageRoutingModule,
    TrafficChartModule,
  ],
  declarations: [StatsPage],

})
export class StatsPageModule {}
