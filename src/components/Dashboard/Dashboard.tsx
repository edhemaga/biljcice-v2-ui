import { FC, useEffect, useState } from "react";
import axiosInstance from "../../shared/traffic/axios";

import { IDevice } from "../../shared/components/Device/IDevice";
import Device from "../../shared/components/Device/Device";

import { EStatus } from "../../shared/models/Base/EStatus";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LineGraph } from "../../shared/components/Graphs/LineGraph/LineGraph";
import { IReadingByMonth } from "../../shared/models/Graph/ILineGraph";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Poslije koristiti listu uređadaj
  const user = useSelector((state: RootState) => state.user);

  const [device, setDevice] = useState<IDevice>({
    id: "",
    geoLocation: "",
    status: 0,
    isDeleted: false,
    createdOn: new Date(),
  });
  const [readingsLastMonth, setReadingsLastMonth] = useState<IReadingByMonth[]>([
    {
      time: '7/1',
      value: 35.4,
      sensorId: '3f7c246c-e670-4fe1-8298-35398f0fc3a7'
    },
    {
      time: "8/1",
      value: 28.9,
      sensorId: "b1a9e7d2-4c12-462f-8a63-18a6d285f9a2"
    },
    {
      time: "9/1",
      value: 41.7,
      sensorId: "8d3e54b6-2a7b-44e6-94f6-6a2b8e042f83"
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.devices) {
          setDevice(user.devices[0] as IDevice);
          // const readingLastMonthResponse = await axiosInstance.get(
          //   `/reading/${user.devices[0].id}/month`
          // );
          // setReadingsLastMonth(readingLastMonthResponse.data as any[]); //TODO Promijeniti any
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
    <div style={{ display: "flex" }}>
      {/* {isLoading && <CircularProgress size={40} />} */}
      <div style={{width: "50%"}}>
        {!isLoading && <Device {...device} />}
      </div>
      <div style={{ width: "50%" }}>
        <LineGraph data={[...readingsLastMonth]} />
      </div>
    </div>
  );
};

export default Dashboard;
