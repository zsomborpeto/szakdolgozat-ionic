import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TrafficChartComponent } from "../traffic-chart/traffic-chart.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [TrafficChartComponent],
  exports: [TrafficChartComponent],
})
export class TrafficChartModule {}
