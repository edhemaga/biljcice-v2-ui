import { IBaseClass } from "../Base/IBaseClass";
import { ESensorType } from "./ESensorType";

export interface ISensor extends IBaseClass{
    name: string;
    manufacturer?: string;
    price?: number;
    type: ESensorType;
    serialNumber: string;
    //readings: IReading[];
    readings: any[];
    high: number;
    low: number;
    deviceId?: string;
}
