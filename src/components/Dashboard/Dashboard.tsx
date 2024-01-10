import { FC, useEffect, useState } from "react";
import axiosInstance from "../shared/traffic/axios";

import { IDevice } from "../shared/components/Device/IDevice";
import Device from "../shared/components/Device/Device";

import { EStatus } from "../shared/models/Base/EStatus";
import { CircularProgress } from "@material-ui/core";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [device, setDevice] = useState<IDevice>({
    id: "",
    status: EStatus.Active,
    isDeleted: false,
    createdOn: new Date(),
    geoLocation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/device/fe71ce17-ac0e-11ee-98a4-18c04d2b3f68"
        );
        setDevice(response.data as IDevice);
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
    <div>
      {isLoading && <CircularProgress size={40} />}
      {!isLoading && <Device {...device} />}
    </div>
  );
};

export default Dashboard;
