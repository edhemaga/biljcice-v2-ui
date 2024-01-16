import { FC, useEffect, useState } from "react";
import axiosInstance from "../../shared/traffic/axios";

import { IDevice } from "../../shared/components/Device/IDevice";
import Device from "../../shared/components/Device/Device";

import { EStatus } from "../../shared/models/Base/EStatus";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LineGraph } from "../../shared/components/Graphs/LineGraph/LineGraph";

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
  const [readingsLastMonth, setReadingsLastMonth] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.devices) {
          setDevice(user.devices[0] as IDevice);
          const readingLastMonthResponse = await axiosInstance.get(
            `/reading/${user.devices[0].id}/month`
          );
          setReadingsLastMonth(readingLastMonthResponse.data as any[]); //TODO Promijeniti any
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
    <>
      {isLoading && <CircularProgress size={40} />}
      {!isLoading && <Device {...device} />}
      <LineGraph data={readingsLastMonth as any[]} />
    </>
  );
};

export default Dashboard;
