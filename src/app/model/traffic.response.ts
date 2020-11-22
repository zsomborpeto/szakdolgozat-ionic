import { Traffic } from './traffic';

export class TrafficResponse {
    car: Array<Traffic>;
    bicycle: Array<Traffic>;
    pedestrian: Array<Traffic>;
}