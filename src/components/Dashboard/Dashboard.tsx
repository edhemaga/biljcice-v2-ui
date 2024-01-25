import "./Dashboard.css";

import { FC, useState } from "react";
import { useFetch } from "../../shared/hooks/useFetch";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { IDevice } from "../../shared/components/Device/IDevice";
import { IReadingByMonth } from "../../shared/models/Graph/ILineGraph";

import DeviceWidget from "../../shared/components/Device/DeviceWidget";
import { LineGraph } from "../../shared/components/Graphs/LineGraph/LineGraph";
import { CircularProgress } from "@material-ui/core";

const Dashboard: FC = () => {
  //Use memo ili use callback
  const user = useSelector((state: RootState) => state.user);

  const [device, setDevice] = useState<IDevice>({
    id: user.devices[0].id ?? "",
    geoLocation: user.devices[0].geoLocation ?? "",
    status: user.devices[0].status ?? 0,
    isDeleted: false,
    createdOn: user.devices[0].createdOn ?? new Date(),
  });

  const readingsLastMonth = useFetch<IReadingByMonth[]>(
    `/reading/${user.devices[0].id}/month`
  );
  const readingsLastDay = useFetch<IReadingByMonth[]>(
    `/reading/${user.devices[0].id}/day`
  );
  return (
    <div className="dashboard-wrapper">
      {/* {isLoading && <CircularProgress size={40} />} */}
      <div className="device-widget m-15">
        <DeviceWidget data={device} />
      </div>
      {!readingsLastDay.isLoading ? (
        <div className="graph-widget m-15">
          <LineGraph
            title="Reading Last 24 Hours"
            data={readingsLastDay.data ?? []}
          />
        </div>
      ) : (
        <CircularProgress size={40} />
      )}
      {!readingsLastMonth.isLoading ? (
        <div className="graph-widget m-15">
          <LineGraph
            title="Reading Last 30 Days"
            data={readingsLastMonth.data ?? []}
          />
        </div>
      ) : (
        <CircularProgress size={40} />
      )}
    </div>
  );
};

export default Dashboard;
