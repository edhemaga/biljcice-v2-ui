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

//TODO napraviti neki generic tip
export const LineGraph: FC<any> = (data: any) => {
  console.log(data);
  const labels = data.map((label: any) => {
    return label.time;
  });
  console.log(labels);
  return <div>Test</div>;
  //     <Line
  //     options={options}
  //     data={...}
  //     {...props}
  //   />
};
