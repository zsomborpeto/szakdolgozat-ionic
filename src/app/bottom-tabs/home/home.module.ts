import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { HomePageRoutingModule } from "./home-routing.module";
import { TrafficChartModule } from "../traffic-chart/traffic-chart.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TrafficChartModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
