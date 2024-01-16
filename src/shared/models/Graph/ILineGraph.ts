export interface ILineGraphData {
    time: string,
    value: number,
}

export interface IReadingByMonth extends ILineGraphData {
    sensorId: string
}