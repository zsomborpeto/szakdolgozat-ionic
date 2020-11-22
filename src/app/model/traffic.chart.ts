import { Traffic } from "./traffic";

export class TrafficData {
  type: string;
  name: string;
  traffic: Array<Traffic>;
  direction: string;
  low: Number;
  middle: Number;
  high: Number;
  constructor(
    type: string,
    name: string,
    low: Number,
    middle: Number,
    high: Number,
    direction: string,
    taffic = null
  ) {
    this.type = type;
    this.name = name;
    this.low = low;
    this.middle = middle;
    this.high = high;
    this.direction = direction;
  }
}
