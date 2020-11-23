import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { TrafficData } from "../../model/traffic.chart";
import { TrafficApiService } from "../../service/traffic.api.service";
import { Chart } from "chart.js";
import { Traffic } from "../../model/traffic";
import { TrafficResponse } from "src/app/model/traffic.response";
import { ChartType } from "src/app/model/chart-type";

@Component({
  selector: "traffic-chart",
  templateUrl: "./traffic-chart.component.html",
  styleUrls: ["./traffic-chart.component.scss"],
})
export class TrafficChartComponent {
  @ViewChild("barCanvas") private barCanvas: ElementRef;
  @Input("hourly") hourly;
  @Input("daily") daily;

  private traffic: Array<TrafficData>;
  private selectedTraffic: string;
  public loading: Boolean;
  public barChart: any;
  public direction: string;

  constructor(public trafficApiService: TrafficApiService) {
    this.direction = "szeged";
  }

  ngOnInit() {
    if (this.hourly === "true") {
      this.traffic = [
        new TrafficData("car", "Autó", 400, 700, 1000, this.direction),
        new TrafficData("bicycle", "Kerékpár", 60, 120, 180, this.direction),
        new TrafficData("pedestrian", "Gyalogos", 60, 120, 180, this.direction),
      ];
    } else if (this.daily === "true") {
      this.traffic = [
        new TrafficData("car", "Autó", 7000, 9000, 11000, this.direction),
        new TrafficData("bicycle", "Kerékpár", 600, 1200, 1800, this.direction),
        new TrafficData(
          "pedestrian",
          "Gyalogos",
          600,
          1200,
          1800,
          this.direction
        ),
      ];
    } else {
      this.traffic = [
        new TrafficData("car", "Autó", 50, 100, 150, this.direction),
        new TrafficData("bicycle", "Kerékpár", 10, 20, 30, this.direction),
        new TrafficData("pedestrian", "Gyalogos", 10, 20, 30, this.direction),
      ];
    }

    this.selectedTraffic = "car";
    this.getPredictions();
  }

  getPredictions(event = null) {
    if (this.barChart) {
      this.barChart.destroy();
    }

    let chartType;

    if (this.hourly === "true") {
      chartType = ChartType.HOUR;
    } else if (this.daily === "true") {
      chartType = ChartType.DAY;
    } else {
      chartType = ChartType.TEN_MINUTE;
    }

    this.loading = true;
    this.trafficApiService
      .getChartTrafficData(this.direction, chartType)
      .then((traffic: TrafficResponse) => {
        this.findActualTraffic("car").traffic = traffic.car;
        this.findActualTraffic("bicycle").traffic = traffic.bicycle;
        this.findActualTraffic("pedestrian").traffic = traffic.pedestrian;

        this.createBarChart();
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      });
  }

  getLabels(traffic: Array<Traffic>) {
    let labels = [];

    if (this.daily === "true") {
      labels = traffic.map((item) =>
        new Date(item.date).toLocaleDateString("hu-HU", {
          month: "short",
          weekday: "short",
          day: "numeric",
        })
      );
    } else if (this.hourly === "true") {
      labels = traffic.map((item) =>
        new Date(item.date).toLocaleTimeString("hu-HU", {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else {
      labels = traffic.map((item) =>
        new Date(item.date).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    return labels;
  }

  createBarChart() {
    const traffic = this.findActualTraffic(this.selectedTraffic).traffic;
    if (this.barChart) {
      this.barChart.destroy();
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: this.getLabels(traffic),
        datasets: [
          {
            label:
              this.findActualTraffic("car").name +
              (this.direction === "szeged" ? " Szeged felé" : " Újszeged felé"),
            data: this.getChartData("car"),
            backgroundColor: this.createColorArray(),
          },
          {
            label:
              this.findActualTraffic("bicycle").name +
              (this.direction === "szeged" ? " Szeged felé" : " Újszeged felé"),
            data: this.getChartData("bicycle"),
            backgroundColor: "#06a144",
          },
          {
            label:
              this.findActualTraffic("pedestrian").name +
              (this.direction === "szeged" ? " Szeged felé" : " Újszeged felé"),
            data: this.getChartData("pedestrian"),
            backgroundColor: "#00702d",
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [{ stacked: true }],
        },
      },
    });
  }

  getChartData(type = null) {
    return this.findActualTraffic(
      type ? type : this.selectedTraffic
    ).traffic.map((item) => item.value);
  }

  createColorArray() {
    let colorArray = [];
    const type = this.findActualTraffic();
    const values = this.getChartData();
    values.forEach((value) => {
      if (value < type.low) {
        colorArray.push("#2fdf75");
      } else if (value < type.middle) {
        colorArray.push("#ffd534");
      } else if (value < type.high) {
        colorArray.push("#df0926");
      } else if (value >= type.high) {
        colorArray.push("#6b0512");
      }
    });

    return colorArray;
  }

  getChartRecentDate() {
    const actualTraffic = this.findActualTraffic(this.selectedTraffic).traffic;

    if (actualTraffic) {
      const minDate = new Date(actualTraffic[0].date);
      const maxDate = new Date(actualTraffic[actualTraffic.length - 1].date);

      if (this.daily === "true") {
        return `${minDate.toLocaleDateString("hu-HU", {
          month: "short",
          day: "numeric",
        })} - ${maxDate.toLocaleDateString("hu-HU", {
          month: "short",
          day: "numeric",
        })}`;
      } else if (this.hourly === "true") {
        return `${minDate.toLocaleTimeString(navigator.language, {
          month: "short",
          day: "numeric",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
        })} 
              - ${maxDate.toLocaleTimeString(navigator.language, {
                month: "short",
                day: "numeric",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}`;
      } else {
        return `${minDate.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })} 
              - ${maxDate.toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
      }
    } else {
      return "xx:xx - xx:xx";
    }
  }

  findActualTraffic(selectedType = null) {
    return this.traffic.find(
      (t) => t.type === (selectedType ? selectedType : this.selectedTraffic)
    );
  }
}
