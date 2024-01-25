import "./PieChart.css";

import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { IAlertBySeverity } from "../../../models/Alert/IAlert";

import { generatePieDataForReadings } from "../../../helpers/helper";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC<{
  title: string;
  data: IAlertBySeverity[] | any[];
}> = ({ data }) => {
  const { labels, items } = generatePieDataForReadings(data);

  const dataForGraph = {
    labels,
    datasets: items,
  };

  return (
    <div className="chart-wrapper">
      <div className="chart">
        <Pie data={dataForGraph} />
      </div>
    </div>
  );
};
