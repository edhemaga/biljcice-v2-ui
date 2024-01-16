import { FC, useEffect, useState } from "react";
import axiosInstance from "../../shared/traffic/axios";

import { IDevice } from "../../shared/components/Device/IDevice";
import Device from "../../shared/components/Device/Device";

import { EStatus } from "../../shared/models/Base/EStatus";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Poslije koristiti listu uređadaj
  const user = useSelector((state: RootState) => state.user.email);
  
  const [device, setDevice] = useState<IDevice>({
    id: "08afbc64-6271-4f3f-b0a2-a0aca06bdcb9",
    status: EStatus.Active,
    isDeleted: false,
    createdOn: new Date(),
    geoLocation: "Sarajevo, Bosnia and Herzegovina",
  });

  const id = "fe71ce17-ac0e-11ee-98a4-18c04d2b3f68";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/device/${id}`);
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
    <>
      <div>

      </div>
      {isLoading && <CircularProgress size={40} />}
      {!isLoading && <Device {...device} />}
    </>
  );
};

export default Dashboard;
