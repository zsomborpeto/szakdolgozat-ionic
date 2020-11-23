import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WeatherApiService } from "./weather.api.service";
import { ApiService } from "./api.service";
import { TrafficResponse } from "../model/traffic.response";
import { ChartType } from "../model/chart-type";

@Injectable({ providedIn: "root" })
export class TrafficApiService extends ApiService {
  private weatherApiService: WeatherApiService;

  constructor(public http: HttpClient) {
    super("http://192.168.0.22:5000/traffic");
    this.weatherApiService = new WeatherApiService(http);
  }

  getActualTrafficData(type) {
    return new Promise((resolve) => {
      this.weatherApiService.getWeatherData().then((temp: Number) => {
        this.http
          .post(this.basePath + "/actual", {
            time: new Date(),
            temp,
            type,
          })
          .subscribe((data: any) => {
            resolve(data);
          });
      });
    });
  }

  getChartTrafficData(direction: string, type: ChartType) {
    return new Promise((resolve) => {
      this.weatherApiService.getWeatherData().then((temp: Number) => {
        this.http
          .post<TrafficResponse>(this.basePath + "/" + type, {
            time: new Date(),
            temp,
            direction,
          })
          .subscribe((data: TrafficResponse) => {
            resolve(data);
          });
      });
    });
  }
}
