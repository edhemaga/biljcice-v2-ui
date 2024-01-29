import { IBaseClass } from "../Base/IBaseClass";

export interface IReading extends IBaseClass {
    value: number;
    sensorId?: string;
    high: number;
    low: number;
}