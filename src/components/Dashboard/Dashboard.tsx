import "./Dashboard.css";
import { FC, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import axiosInstance from "../../shared/traffic/axios";

import { IDevice } from "../../shared/components/Device/IDevice";
import { IReadingByMonth } from "../../shared/models/Graph/ILineGraph";

import Device from "../../shared/components/Device/Device";
import { LineGraph } from "../../shared/components/Graphs/LineGraph/LineGraph";
import { CircularProgress } from "@material-ui/core";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.user);

  const [device, setDevice] = useState<IDevice>({
    id: "",
    geoLocation: "",
    status: 0,
    isDeleted: false,
    createdOn: new Date(),
  });
  const [readingsLastMonth, setReadingsLastMonth] = useState<IReadingByMonth[]>(
    []
  );
  const [readingsLastDay, setReadingsLastDay] = useState<IReadingByMonth[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.devices) {
          setDevice(user.devices[0] as IDevice);
          const readingLastMonthResponse = await axiosInstance.get(
            `/reading/${user.devices[0].id}/month`
          );
          setReadingsLastMonth(
            readingLastMonthResponse.data as IReadingByMonth[]
          );
          const readingsLastDayResponse = await axiosInstance.get(
            `/reading/${user.devices[0].id}/day`
          );
          setReadingsLastDay(readingsLastDayResponse.data as IReadingByMonth[]);
        }

        setIsLoading(false);
      } catch (error) {
        throw new Error(JSON.stringify(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="dashboard-wrapper">
      {/* {isLoading && <CircularProgress size={40} />} */}
      <div className="device-widget m-15">
        {!isLoading && <Device data={device} />}
      </div>
      <div className="graph-widget m-15">
        <LineGraph data={[...readingsLastDay]} />
      </div>
      <div className="graph-widget m-15">
        <LineGraph data={[...readingsLastMonth]} />
      </div>
    </div>
  );
};

export default Dashboard;
