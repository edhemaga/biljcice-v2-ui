export interface ILineGraphConfig {
    title: string;
}

export interface ILineGraphData {
    time: string,
    value: number,
}

export interface IReadingByMonth extends ILineGraphData {
    sensorId: string
}