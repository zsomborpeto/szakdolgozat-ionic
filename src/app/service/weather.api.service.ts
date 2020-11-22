import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Temperature } from "../model/temperature";

@Injectable({ providedIn: "root" })
export class WeatherApiService extends ApiService {
  constructor(public http: HttpClient) {
    super(
      `https://api.openweathermap.org/data/2.5/weather?q=Szeged&appid=${environment.weatherApiKey}&units=metric`
    );
  }

  getWeatherData() {
    return new Promise((resolve) => {
      this.http.get(this.basePath).subscribe(({ main }: any) => {
        resolve(main.temp);
      });
    });
  }
}
