import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { IDevice } from "../../shared/components/Device/IDevice";
import Device from "./Device/Device";

const Devices: FC = () => {
  const deviceData = useSelector((state: RootState) => state.user.devices);

  const [devices, setDevices] = useState<Partial<IDevice>[]>();

  let content: JSX.Element = <></>;

  useEffect(() => {
    if (deviceData) {
      setDevices(deviceData);
    }
    // if (devices?.length === 1) content = <Device data={}></Device>;
  }, [deviceData]);

  return <div>{devices ? <Device props={devices[0]} /> : null}</div>;
};

export default Devices;
