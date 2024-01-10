import { FC } from "react";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const LineGraph: FC = (data: any) => {
  return <div>Test</div>;
  //     <Line
  //     options={options}
  //     data={...}
  //     {...props}
  //   />
};
