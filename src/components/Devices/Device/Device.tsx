import { FC, useEffect, useState } from "react";

import axiosInstance from "../../../shared/traffic/axios";

import DeviceWidget from "../../../shared/components/Device/DeviceWidget";

import { IDevice } from "../../../shared/components/Device/IDevice";
import { ISensor } from "../../../shared/models/Sensor/ISensor";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useFetch } from "../../../shared/hooks/useFetch";
import { CircularProgress } from "@material-ui/core";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 150,
    editable: true,
  },
  {
    field: "high",
    headerName: "High",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "low",
    headerName: "Low",
    type: "number",
    width: 110,
    editable: true,
  },
];

const Device: FC<{ props: Partial<IDevice> }> = ({ props }) => {
  const { data, isLoading, error } = useFetch<ISensor[]>("/sensor", {
    page: 0,
    size: 10,
    device: props.id,
  });
  if (error) return <div>An error has occured!</div>;
  return (
    <>
      <DeviceWidget data={props} />
      <div style={{ height: 400, width: "fit-content" }}>
        {!isLoading ? (
          <DataGrid rows={data || []} columns={columns} />
        ) : (
          <CircularProgress size={40} />
        )}
      </div>
    </>
  );
};

export default Device;
