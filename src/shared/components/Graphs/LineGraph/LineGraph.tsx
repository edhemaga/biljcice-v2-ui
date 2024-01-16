import { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'; import { IReadingByMonth } from "../../../models/Graph/ILineGraph";

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Line Chart",
//     },
//   },
// };

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//TODO napraviti neki generic tip
export const LineGraph: FC<{ data: IReadingByMonth[] }> = ({ data }) => {
  const labels: string[] = data.map((label: IReadingByMonth) => {
    return label.time;
  });
  const values: number[] = data.map((label: IReadingByMonth) => {
    return label.value;
  });

  const dataForLine = {
    labels,
    datasets: [
      {
        label: 'Sensor 1',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  console.log(labels);
  console.log(values);
  return <Line data={dataForLine} />;
};
