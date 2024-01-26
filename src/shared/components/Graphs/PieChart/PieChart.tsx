import "./PieChart.css";

import { FC } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CircularProgress } from "@material-ui/core";

import Error from "../../Error/Error";

import { IAlertBySeverity } from "../../../models/Alert/IAlert";
import { IStandardResponse } from "../../../models/Base/IBaseResponse";

import { generatePieDataForReadings } from "../../../helpers/helper";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC<{
  title: string;
  dataProps: IStandardResponse<IAlertBySeverity[] | any[]>;
}> = ({ title, dataProps }) => {
  const { labels, items } = generatePieDataForReadings(dataProps.data ?? []);

  const dataForGraph = {
    labels,
    datasets: items,
  };

  if (dataProps.isLoading) return <CircularProgress size={40} />;
  if (dataProps.error) return <Error />;
  
  return (
    <div className="chart-wrapper">
      <div className="pie-chart">
        <Pie data={dataForGraph} />
      </div>
    </div>
  );
};
