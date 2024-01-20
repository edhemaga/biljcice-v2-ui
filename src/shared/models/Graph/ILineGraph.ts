export interface ILineGraphConfig {
    title: string;
}

export interface ILineGraphData {
    time: string,
    value: number,
}

export interface IReadingByMonth extends ILineGraphData {
    sensor: string
}

export interface ILineGraphItem {
    label: string;
    data: number[];
}