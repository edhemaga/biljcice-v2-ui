import "./Devices.css";

import { FC, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Device from "./Device/Device";

import { IDevice } from "../../shared/components/Device/IDevice";

const Devices: FC = () => {
  const [devices, setDevices] = useState<IDevice[]>([
    ...(useSelector((state: RootState) => state.user.devices) as IDevice[]),
  ]);
  const [selectedDevice, setSelectedDevice] = useState<IDevice | undefined>(
    devices[0]
  );

  const handleChange = (event: SelectChangeEvent) => {
    const deviceSelected = devices.find(
      (device) => device.id === event.target.value
    );
    setSelectedDevice(deviceSelected);
  };

  return (
    <div>
      {devices.length !== 1 ? (
        <div className="device-select-wrapper">
          <InputLabel id="demo-simple-select-autowidth-label">
            Device
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedDevice?.id}
            onChange={handleChange}
            autoWidth
            label="Age"
          >
            {devices?.map((device) => {
              return (
                <MenuItem key={device.id} value={device.id}>
                  {device.id}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      ) : null}
      {devices ? <Device props={selectedDevice} /> : null}
    </div>
  );
};

export default Devices;
