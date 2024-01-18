import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { IDevice } from "../../shared/components/Device/IDevice";
import Device from "./Device/Device";

const Devices: FC = () => {
  const [devices, setDevices] = useState<Partial<IDevice>[]>([]);
  const deviceData = useSelector((state: RootState) => state.user.devices);
  if (deviceData) {
    setDevices(deviceData);
  }
  let content: JSX.Element = <></>;

  useEffect(() => {
    if (devices?.length === 1) content = <Device data={}></Device>;
  }, [devices]);

  content = <div></div>;
  return content;
};

export default Devices;
