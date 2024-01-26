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

import { CircularProgress } from "@material-ui/core";

import { IReadingByMonth } from "../../../models/Graph/ILineGraph";
import { IStandardResponse } from "../../../models/Base/IBaseResponse";

import { generateLineGraphForReadings } from "../../../helpers/helper";

import Error from "../../Error/Error";

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
  dataProps: IStandardResponse<IReadingByMonth[] | any[]>;
}> = ({ dataProps }) => {
  //This was done in order to prevent unnecessary graph generation on re-render if the data was not changed
  const { labels, items } = useMemo(
    () => generateLineGraphForReadings(dataProps.data ?? []),
    [dataProps.data]
  );

  const dataForLine = {
    labels,
    datasets: items,
  };

  if (dataProps.isLoading) return <CircularProgress size={40} />;
  if (dataProps.error) return <Error />;

  return (
    <div className="chart-wrapper">
      <div className="line-chart">
        <Line options={options} data={dataForLine} />
      </div>
    </div>
  );
};
