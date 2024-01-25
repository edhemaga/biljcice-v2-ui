import { IBaseClass } from "../Base/IBaseClass";
import { ESensorType } from "../Sensor/ESensorType";
import { ESeverity } from "./ESeverity";

export interface IAlert extends IBaseClass {
    severity: ESeverity;
    notified: boolean;
}

export interface IAlertExtended extends Partial<IAlert> {
    high: number;
    low: number;
    name: string;
    type: ESensorType;
}

export interface IAlertBySeverity {
    count: number;
    severity: ESeverity;
}
