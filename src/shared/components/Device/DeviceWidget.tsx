import "./DeviceWidget.css";

import { FC } from "react";

import { IDevice } from "./IDevice";
import { EStatus } from "../../models/Base/EStatus";

import { formatDate } from "../../helpers/helper";

import { Button, Paper, Typography, makeStyles } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DeviceWidget: FC<{ data: IDevice; buttonShowed: boolean }> = ({
  data,
  buttonShowed,
}) => {

  const { id, status, createdOn, geoLocation } = data;
  if ((id || status || createdOn || geoLocation) == null) return <></>;
  return (
    <div className="w-100">
      <Paper className="root" style={{ padding: 10 }} elevation={3}>
        <div>
          <Typography variant="h6">Device</Typography>
        </div>
        <hr />
        <div className="row">
          <div className="rowContent">
            <DevicesIcon />
            <span className="leftMargin">ID: {id}</span>
          </div>
        </div>
        <div className="row">
          <div className="rowContent">
            <NotificationsActiveIcon />
            <span className="leftMargin">
              Status: {EStatus[status ?? 0]}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="rowContent">
            <CalendarTodayIcon />
            <span className="leftMargin">
              Added on: {formatDate(new Date(createdOn ?? ""))}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="rowContent">
            <LocationOnIcon />
            <span className="leftMargin">Location: {geoLocation}</span>
          </div>
        </div>
        {buttonShowed ? <Button variant="contained">See details</Button> : null}
      </Paper>
    </div>
  );
};

export default DeviceWidget;
