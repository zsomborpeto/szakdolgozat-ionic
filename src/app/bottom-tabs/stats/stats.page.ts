import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TrafficChartComponent } from "../traffic-chart/traffic-chart.component";

@Component({
  selector: "app-stats",
  templateUrl: "./stats.page.html",
  styleUrls: ["./stats.page.scss"],
})
export class StatsPage {
  @ViewChild("trafficChartDaily") trafficChartDaily: TrafficChartComponent;
  @ViewChild("trafficChartHourly") trafficChartHourly: TrafficChartComponent;

  constructor() {}

  ngOnInit() {}

  doRefresh(event) {
    this.trafficChartDaily.getPredictions(event);
    this.trafficChartHourly.getPredictions(event);
  }
}
