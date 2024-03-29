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
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { CircularProgress } from "@mui/material";

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
  Legend,
  Colors
);

//TODO napraviti neki generic tip
export const LineGraph: FC<{
  title: string;
  dataProps: IStandardResponse<IReadingByMonth[] | any[]>;
}> = ({ dataProps, title }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      colors: {
        forceOverride: true,
      },
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
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
