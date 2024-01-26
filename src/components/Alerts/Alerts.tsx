import "./Alerts.css";

import { FC, useState } from "react";
import { useFetch } from "../../shared/hooks/useFetch";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import Error from "../../shared/components/Error/Error";

import { CircularProgress } from "@material-ui/core";

import { GridRowsProp, DataGrid, GridColDef } from "@mui/x-data-grid";

import { IBaseResposne } from "../../shared/models/Base/IBaseResponse";
import {
  IAlertBySeverity,
  IAlertExtended,
} from "../../shared/models/Alert/IAlert";
import { PieChart } from "../../shared/components/Graphs/PieChart/PieChart";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  //TODO Možda za kasnije implementirati da se vrijednost može urediti i klikom na tabelu
  {
    field: "severity",
    headerName: "Severity",
    flex: 2,
    align: "left",
    //editable: true,
  },
  {
    field: "value",
    headerName: "Reading value",
    flex: 2,
    align: "left",
    //editable: true,
  },
  {
    field: "high",
    headerName: "High",
    // type: "number",
    flex: 1,
    align: "left",
    //editable: true,
  },
  {
    field: "low",
    headerName: "Low",
    // type: "number",
    flex: 1,
    align: "left",
    //editable: true,
  },
  {
    field: "name",
    headerName: "Sensor Name",
    flex: 2,
    align: "left",
    //editable: true,
  },
  {
    field: "type",
    headerName: "Sensor Type",
    flex: 2,
    align: "left",
    //editable: true,
  },
];

const Alerts: FC = () => {
  const devices = useSelector((state: RootState) => state.user.devices);

  const [device, setDevice] = useState({ device: devices[0].id });
  const [params, setParams] = useState({
    page: 0,
    size: 10,
  });

  const alerts = useFetch<IBaseResposne<IAlertExtended[]>>(`/alert`, {
    ...device,
    ...params,
  });

  const alertsBySeverityLastDay = useFetch<IAlertBySeverity[]>(
    "/alert/day",
    null,
    device
  );
  const alertsBySeverity = useFetch<IAlertBySeverity[]>(
    "/alert/all",
    null,
    device
  );

  // if (alerts.isLoading) return <CircularProgress size={40} />;
  // if (alerts.error) return <Error />;

  return (
    <div className="alerts-wrapper">
      <div className="table-wrapper">
        {!alerts.isLoading ? (
          <DataGrid
            pagination
            //Ovo je ključ ove tabele, ako ne podesiš dobro ove parametere sa state-om, imate ćeš probleme kod paginacije
            //Defaultno stanje je sa nultim indeksom, te će maksimalno ići do 1 bez state-a i neće raditi ukolio state nije refernca
            initialState={{
              pagination: {
                paginationModel: {
                  page: params.page,
                  pageSize: params.size,
                },
              },
            }}
            paginationMode="server"
            rowCount={alerts.data?.count ?? 0}
            onPaginationModelChange={(value) => {
              setParams({
                ...params,
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
