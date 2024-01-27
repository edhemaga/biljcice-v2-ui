import "./Device.css";

import { FC, useEffect, useRef, useState } from "react";
import { useFetch } from "../../../shared/hooks/useFetch";

import axiosInstance from "../../../shared/traffic/axios";

import Form from "../../../shared/components/Form/Form";
import DeviceWidget from "../../../shared/components/Device/DeviceWidget";

import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { CircularProgress } from "@material-ui/core";

import { IDevice } from "../../../shared/components/Device/IDevice";
import { ISensor, ISensorConfig } from "../../../shared/models/Sensor/ISensor";
import { IFormConfig } from "../../../shared/components/Form/IForm";
import { TRefreshFunction } from "../../../shared/models/TRefreshFunction";
import { IPagination } from "../../../shared/models/Base/IPagination";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  //TODO Možda za kasnije implementirati da se vrijednost može urediti i klikom na tabelu
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    align: "left",
    disableColumnMenu: true,
    //editable: true,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    flex: 2,
    align: "left",
    disableColumnMenu: true,
    //editable: true,
  },
  {
    field: "high",
    headerName: "High",
    flex: 1,
    align: "left",
    disableColumnMenu: true,
    //editable: true,
  },
  {
    field: "low",
    headerName: "Low",
    flex: 1,
    align: "left",
    disableColumnMenu: true,
    //editable: true,
  },
];

const Device: FC<{ props: IDevice | undefined }> = ({ props }) => {
  const [device, setDevice] = useState<IDevice | undefined>(props);

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
        touched: false,
      },
      {
        id: "manufacturer",
        type: "Text",
        placeholder: "Manufacturer",
        required: true,
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
      {
        id: "high",
        type: "Number",
        placeholder: "Upper boundary",
        required: true,
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
      {
        id: "low",
        type: "Number",
        placeholder: "Lower boundary",
        required: true,
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
      {
        id: "submit",
        type: "Button",
        placeholder: "Save",
        spacing: 10,
        fullWidth: true,
        touched: false,
      },
    ],
  });

  const [updatedData, setUpdatedData] = useState<ISensor[]>();

  const [params, setParams] = useState<IPagination>({
    page: 0,
    size: 10,
  });

  useEffect(() => {
    setSensorConfig({
      ...sensorConfig,
      state: {
        name: "",
        manufacturer: "",
        high: 0,
        low: 0,
      },
    });
    form.current?.refresh();
  }, [props?.id]);

  const form = useRef<TRefreshFunction>(null);

  const { data, isLoading, error } = useFetch<ISensor[]>(
    `/sensor?device=${props?.id}`,
    {
      ...params,
    }
  );

  const passData = async (formData: ISensorConfig): Promise<void> => {
    try {
      if (formData.high < 0 || formData.low < 0) {
        return;
      }

      const updatedSensor: ISensorConfig = {
        name: String(formData.name),
        manufacturer: String(formData.manufacturer),
        high: Number(formData.high),
        low: Number(formData.low),
      };
      await axiosInstance.put(`/sensor/${device}/config`, updatedSensor);
      const updatedSensorResponse = await axiosInstance.get(
        `/sensor?device=${props?.id}`,
        {
          params,
        }
      );
      setUpdatedData(updatedSensorResponse.data as ISensor[]);
      setSensorConfig({
        ...sensorConfig,
        state: {
          name: "",
          manufacturer: "",
          high: 0,
          low: 0,
        },
      });

      form.current?.refresh();
    } catch {}
  };

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setDevice(params.row.id);
    const selectedSensor: ISensorConfig = {
      name: params.row.name,
      manufacturer: params.row.manufacturer,
      high: Number(params.row.high),
      low: Number(params.row.low),
    };
    setSensorConfig({ ...sensorConfig, state: selectedSensor });
  };
  if (!props) return <div>No device provided!</div>;

  if (error) return <div>An error has occured!</div>;

  return (
    <>
      <div className="device-wrapper">
        <div className="device-widget-wrapper">
          <DeviceWidget data={props} buttonShowed={false} />
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
    </>
  );
};

export default Device;
