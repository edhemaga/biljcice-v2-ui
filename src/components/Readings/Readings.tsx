import "./Readings.css";

import { FC, useState } from "react";

import { useFetch } from "../../shared/hooks/useFetch";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { GridColDef } from "@mui/x-data-grid";

import Table from "../../shared/components/Table/Table";

import { IReading } from "../../shared/models/Reading/IReading";

import { formatDate } from "../../shared/helpers/helper";
import { IBaseResposne } from "../../shared/models/Base/IBaseResponse";
import { IPagination } from "../../shared/models/Base/IPagination";

const Readings: FC = () => {
  const devices = useSelector((state: RootState) => state.user.devices);

  const [device, setDevice] = useState<string | undefined>(devices[0].id);

  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    size: 10,
  });
  const columns: GridColDef[] = [
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 2,
      align: "left",
      disableColumnMenu: true,
      valueGetter: (params) => {
        return formatDate(new Date(params.row.createdOn));
      },
    },
    {
      field: "value",
      headerName: "Reading value",
      flex: 2,
      align: "left",
      disableColumnMenu: true,
    },
    {
      field: "high",
      headerName: "High",
      // type: "number",
      flex: 1,
      align: "left",
      disableColumnMenu: true,
    },
    {
      field: "low",
      headerName: "Low",
      // type: "number",
      flex: 1,
      align: "left",
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Sensor Name",
      flex: 2,
      align: "left",
      disableColumnMenu: true,
    },
    {
      field: "serialNumber",
      headerName: "Sensor Serial Number",
      flex: 2,
      align: "left",
      disableColumnMenu: true,
    },
  ];

  const readings = useFetch<IBaseResposne<IReading[]>>(
    `/reading?device=${device}`,
    { ...pagination }
  );

  const passData = (data: IPagination) => {
    setPagination({
      ...pagination,
      page: data.page,
      size: data.size,
    });
  };

  if (readings.data?.count === 0 || readings.data?.count === undefined)
    return <div>No data!</div>;

  return (
    <>
      <Table
        response={readings}
        columns={columns}
        pagination={pagination}
        passData={passData}
      />
    </>
  );
};

export default Readings;
