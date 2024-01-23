import { FC } from "react";

import { IDevice } from "./IDevice";
import { EStatus } from "../../models/Base/EStatus";

import { formatDate } from "../../helpers/helper";

import { Button, Paper, Typography, makeStyles } from "@material-ui/core";
import DevicesIcon from "@material-ui/icons/Devices";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";

//TODO Izbaciti u drugi fajl
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: 400,
    margin: "auto",
    marginTop: 0,
    position: "relative",
    textAlign: "left", // Align text to the left
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  header: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  detailItem: {
    marginBottom: theme.spacing(1),
  },
  updatedOn: {
    fontStyle: "italic",
  },
  row: {
    margin: "15px 10px",
  },
  leftMargin: {
    marginLeft: "10px",
    lineHeight: 1.5,
    display: "inline-block",
    verticalAlign: "middle",
  },
  rowContent: {
    display: "flex",
  },
  marginAuto: {
    margin: "auto",
  },
}));

const DeviceWidget: FC<{ data: Partial<IDevice> }> = ({ data }) => {
  const classes = useStyles();

  const { id, status, createdOn, geoLocation } = data;
  if ((id || status || createdOn || geoLocation) == null) return <></>;
  return (
    <div className="w-100">
      <Paper classes={classes} style={{ padding: 10 }} elevation={3}>
        <div>
          <Typography variant="h6">Device</Typography>
        </div>
        <hr />
        <div className={classes.row}>
          <div className={classes.rowContent}>
            <DevicesIcon />
            <span className={classes.leftMargin}>ID: {id}</span>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.rowContent}>
            <NotificationsActiveIcon />
            <span className={classes.leftMargin}>
              Status: {EStatus[status ?? 0]}
            </span>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.rowContent}>
            <CalendarTodayIcon />
            <span className={classes.leftMargin}>
              Added on: {formatDate(new Date(createdOn ?? ""))}
            </span>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.rowContent}>
            <LocationOnIcon />
            <span className={classes.leftMargin}>Location: {geoLocation}</span>
          </div>
        </div>
        <Button variant="contained">See details</Button>
      </Paper>
    </div>
  );
};

export default DeviceWidget;
