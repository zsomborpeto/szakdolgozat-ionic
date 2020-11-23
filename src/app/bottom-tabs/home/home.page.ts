import { Component, ViewChild } from "@angular/core";
import { TrafficChartComponent } from "../traffic-chart/traffic-chart.component";
import { TrafficApiService } from "../../service/traffic.api.service";
import { WeatherApiService } from "../../service/weather.api.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild("trafficChart") trafficChart: TrafficChartComponent;

  selectedTraffic: string;
  loading: Boolean;
  temperature: Number;

  traffic: Array<any> = [
    {
      type: "car",
      name: "Autó",
      toSzeged: Number,
      toUjszeged: Number,
      low: 50,
      middle: 100,
      high: 150,
    },
    {
      type: "bicycle",
      name: "Kerékpár",
      toSzeged: Number,
      toUjszeged: Number,
      low: 10,
      middle: 20,
      high: 30,
    },
    {
      type: "pedestrian",
      name: "Gyalogos",
      toSzeged: Number,
      toUjszeged: Number,
      low: 10,
      middle: 20,
      high: 30,
    },
    {
      type: "public-transport",
      name: "Busz/Troli",
    },
  ];

  constructor(
    public trafficApiService: TrafficApiService,
    public weatherApiService: WeatherApiService
  ) {}

  ngOnInit() {
    this.selectedTraffic = "car";

    this.getTrafficData();
    this.getWeatherData();
  }

  doRefresh(event) {
    this.getTrafficData(event);
    this.getWeatherData();
    this.trafficChart.getPredictions(event);
  }

  getTrafficData(event = null) {
    this.loading = true;
    this.trafficApiService
      .getActualTrafficData(this.selectedTraffic)
      .then(({ toSzeged, toUjszeged }) => {
        this.findActualTraffic(this.selectedTraffic).toSzeged = toSzeged;
        this.findActualTraffic(this.selectedTraffic).toUjszeged = toUjszeged;
        this.loading = false;
        if (event && !this.trafficChart.loading) {
          event.target.complete();
        }
      });
  }

  getWeatherData() {
    this.weatherApiService.getWeatherData().then((temp: number) => {
      this.temperature = Math.round(temp);
    });
  }

  getVolumeOfTraffic(direction) {
    const type = this.findActualTraffic();
    const value = direction === 0 ? type.toSzeged : type.toUjszeged;

    if (value < type.low) {
      return "Alacsony";
    } else if (value < type.middle) {
      return "Közepes";
    } else if (value < type.high) {
      return "Magas";
    } else if (value) {
      return "Extrém";
    }
  }

  getColor(direction) {
    const type = this.findActualTraffic();
    const value = direction === 0 ? type.toSzeged : type.toUjszeged;

    if (value < type.low) {
      return "low";
    } else if (value < type.middle) {
      return "middle";
    } else if (value < type.high) {
      return "high";
    } else if (value >= type.high) {
      return "extreme";
    } else {
      return "default-card";
    }
  }

  getRecentDate() {
    const date = new Date();
    let plusTen = new Date();
    date.setMinutes(this.floorToTenMinutes(date));
    plusTen.setMinutes(date.getMinutes() + 10);
    return `${date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    })} 
              - ${plusTen.toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
  }

  floorToTenMinutes(date: Date) {
    return Math.floor(date.getMinutes() / 10) * 10;
  }

  getTitle() {
    return this.findActualTraffic().name;
  }

  getRecent(dir) {
    const type = this.findActualTraffic();
    return dir === 0 ? type.toSzeged : type.toUjszeged;
  }

  findActualTraffic(type = null) {
    return this.traffic.find(
      (t) => t.type === (type ? type : this.selectedTraffic)
    );
  }
}
