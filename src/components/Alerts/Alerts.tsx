import "./Alerts.css";

import { FC, useState } from "react";
import { useFetch } from "../../shared/hooks/useFetch";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { PieChart } from "../../shared/components/Graphs/PieChart/PieChart";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { IBaseResposne } from "../../shared/models/Base/IBaseResponse";
import {
  IAlertBySeverity,
  IAlertExtended,
} from "../../shared/models/Alert/IAlert";

import { ESeverity } from "../../shared/models/Alert/ESeverity";
import { ESensorType } from "../../shared/models/Sensor/ESensorType";
import { IPagination } from "../../shared/models/Base/IPagination";
import { CircularProgress } from "@mui/material";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  //TODO Možda za kasnije implementirati da se vrijednost može urediti i klikom na tabelu
  {
    field: "severity",
    headerName: "Severity",
    flex: 2,
    align: "left",
    valueGetter: (params) => {
      return ESeverity[params.row.severity];
    },
    disableColumnMenu: true,
    // cellClassName: (params) =>
    //   clsx("", {
    //     red: (params.row.severity = 3),
    //     yellow: (params.row.severity = 2),
    //     green: (params.row.severity = 1),
    //   }),
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
    field: "type",
    headerName: "Sensor Type",
    flex: 2,
    align: "left",
    valueGetter: (params) => {
      return ESensorType[params.row.type];
    },
    disableColumnMenu: true,
  },
];

const Alerts: FC = () => {
  const devices = useSelector((state: RootState) => state.user.devices);

  const [device, setDevice] = useState(devices[0].id);
  const [pagination, setPagination] = useState<IPagination>({
    page: 0,
    size: 10,
  });

  const alerts = useFetch<IBaseResposne<IAlertExtended[]>>(
    `/alert?device=${device}`,
    {
      ...pagination,
    }
  );

  const alertsBySeverityLastDay = useFetch<IAlertBySeverity[]>(
    `/alert/day?device=${device}`
  );
  const alertsBySeverity = useFetch<IAlertBySeverity[]>(
    `/alert/all?device=${device}`
  );

  if (alerts.data?.data.length === 0) return <div>No alerts for device!</div>;

  return (
    <div className="alerts-wrapper">
      <div className="alerts-table-wrapper">
        {!alerts.isLoading ? (
          <DataGrid
            pagination
            //Ovo je ključ ove tabele, ako ne podesiš dobro ove parametere sa state-om, imate ćeš probleme kod paginacije
            //Defaultno stanje je sa nultim indeksom, te će maksimalno ići do 1 bez state-a i neće raditi ukolio state nije refernca
            initialState={{
              pagination: {
                paginationModel: {
                  page: pagination.page,
                  pageSize: pagination.size,
                },
              },
            }}
            paginationMode="server"
            rowCount={alerts.data?.count ?? 0}
            onPaginationModelChange={(value) => {
              setPagination({
                ...pagination,
                page: value.page,
                size: value.pageSize,
              });
            }}
            //Uvijek mora biti niz pa makar bio i jedan element
            pageSizeOptions={[10]}
            //onRowClick={handleRowClick}
            rows={alerts.data?.data || []}
            columns={columns}
          />
        ) : (
          <CircularProgress size={40} />
        )}
      </div>
      <div className="pie-charts">
        <PieChart
          title="Alerts Last 24 Hours"
          dataProps={alertsBySeverityLastDay}
        />
        <PieChart title="Alerts Last 24 Hours" dataProps={alertsBySeverity} />
      </div>
    </div>
  );
};

export default Alerts;
