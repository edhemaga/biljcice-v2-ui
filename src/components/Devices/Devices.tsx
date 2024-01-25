import "./Devices.css";

import { FC, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import Device from "./Device/Device";

import { IDevice } from "../../shared/components/Device/IDevice";
import { InputLabel, MenuItem } from "@material-ui/core";

const Devices: FC = () => {
  const deviceData = useSelector((state: RootState) => state.user.devices);

  const [devices, setDevices] = useState<Partial<IDevice>[]>();
  const [selectedDevice, setSelectedDevice] = useState<string>();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDevice(event.target.value);
  };

  useEffect(() => {
    if (deviceData) {
      setDevices(deviceData);
    }
    // if (devices?.length === 1) content = <Device data={}></Device>;
  }, [deviceData]);

  return (
    <div>
      <div className="device-select-wrapper">
        <InputLabel id="demo-simple-select-autowidth-label">Device</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedDevice}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          {/* <MenuItem value="">
          <em>None</em> */}
          {devices?.map((device) => {
            //TODO zamijneiti placeholder sa device name
            return <MenuItem value={device.id}>{device.id}</MenuItem>;
          })}
        </Select>
      </div>
      {devices ? <Device props={devices[0]} /> : null}
    </div>
  );
};

export default Devices;
