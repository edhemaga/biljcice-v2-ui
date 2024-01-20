import "./Device.css";

import { FC, useRef, useState } from "react";

import DeviceWidget from "../../../shared/components/Device/DeviceWidget";

import { IDevice } from "../../../shared/components/Device/IDevice";
import { ISensor, ISensorConfig } from "../../../shared/models/Sensor/ISensor";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useFetch } from "../../../shared/hooks/useFetch";
import { CircularProgress } from "@material-ui/core";
import { IFormConfig } from "../../../shared/components/Form/IForm";
import Form from "../../../shared/components/Form/Form";
import { TRefreshFunction } from "../../../shared/models/TRefreshFunction";
import axiosInstance from "../../../shared/traffic/axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  //TODO Možda za kasnije implementirati da se vrijednost može urediti i klikom na tabelu
  {
    field: "name",
    headerName: "Name",
    width: 150,
    //editable: true,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 150,
    //editable: true,
  },
  {
    field: "high",
    headerName: "High",
    type: "number",
    width: 110,
    //editable: true,
  },
  {
    field: "low",
    headerName: "Low",
    type: "number",
    width: 110,
    //editable: true,
  },
];

const Device: FC<{ props: Partial<IDevice> }> = ({ props }) => {
  const [selectedSensorId, setSelectedSensorId] = useState<string>();

  const [sensorConfig, setSensorConfig] = useState<IFormConfig<ISensorConfig>>({
    title: "Sensor configuration",
    state: {
      name: "",
      manufacturer: "",
      high: 0,
      low: 0,
    },
    fields: [
      {
        id: "name",
        type: "Text",
        placeholder: "Name",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "manufacturer",
        type: "Text",
        placeholder: "Manufacturer",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "high",
        type: "Number",
        placeholder: "Upper boundary",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "low",
        type: "Number",
        placeholder: "Lower boundary",
        required: true,
        spacing: 10,
        fullWidth: true,
      },
      {
        id: "submit",
        type: "Button",
        placeholder: "Save",
        spacing: 10,
        fullWidth: true,
      },
    ],
  });

  const [updatedData, setUpdatedData] = useState<ISensor[]>();

  const form = useRef<TRefreshFunction>(null);

  const params = {
    page: 0,
    size: 10,
    device: props.id,
  };

  const { data, isLoading, error } = useFetch<ISensor[]>("/sensor", params);

  const passData = async (formData: ISensorConfig): Promise<void> => {
    if (formData.high < 0 || formData.low < 0) {
      return;
    }
    await axiosInstance.put(`/sensor/${selectedSensorId}/config`, formData);

    const updatedSensorResponse = await axiosInstance.get(`/sensor`, {
      params,
    });
    setUpdatedData(updatedSensorResponse.data as ISensor[]);
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setSelectedSensorId(params.row.id);
    const selectedSensor: ISensorConfig = {
      name: params.row.name,
      manufacturer: params.row.manufacturer,
      high: Number(params.row.high),
      low: Number(params.row.low),
    };
    setSensorConfig({ ...sensorConfig, state: selectedSensor });
  };

  if (error) return <div>An error has occured!</div>;
  return (
    <div className="device-wrapper">
      <div className="device-widget-wrapper">
        <DeviceWidget data={props} />
      </div>
      <div className="table-wrapper">
        {!isLoading ? (
          <DataGrid
            onRowClick={handleRowClick}
            rows={updatedData || data || []}
            columns={columns}
          />
        ) : (
          <CircularProgress size={40} />
        )}
      </div>
      <div className="sensor-form-wrapper">
        <Form ref={form} config={sensorConfig} passData={passData}></Form>
      </div>
    </div>
  );
};

export default Device;
