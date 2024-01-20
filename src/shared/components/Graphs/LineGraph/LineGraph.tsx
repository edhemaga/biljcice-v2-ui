import "./LineGraph.css";

import { FC, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IReadingByMonth } from "../../../models/Graph/ILineGraph";
import { generateLineGraphForReadings } from "../../../helpers/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Reading by month",
    },
  },
};

//TODO napraviti neki generic tip
export const LineGraph: FC<{
  title: string;
  data: IReadingByMonth[] | any[];
}> = ({ data }) => {
  //This was done in order to prevent unnecessary graph generation on re-render if the data was not changed
  const { labels, items } = useMemo(
    () => generateLineGraphForReadings(data),
    [data]
  );

  const dataForLine = {
    labels,
    datasets: items,
  };

  return (
    <div className="chart-wrapper">
      <div className="chart">
        <Line options={options} data={dataForLine} />
      </div>
    </div>
  );
};
