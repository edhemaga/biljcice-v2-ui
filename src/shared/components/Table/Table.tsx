import "./Table.css";

import { FC, useState } from "react";

import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { IPagination } from "../../models/Base/IPagination";
import {
  IBaseResposne,
  IStandardResponse,
} from "../../models/Base/IBaseResponse";

const Table: FC<{
  columns: GridColDef[];
  response: IStandardResponse<IBaseResposne<any>>;
  passData: (data: any) => void;
  pagination: IPagination;
  count?: number;
}> = ({ columns, response, pagination, passData, count }) => {
  return (
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
      rowCount={response.data?.count}
      onPaginationModelChange={(value) => {
        passData({ page: value.page, size: value.pageSize });
      }}
      //Uvijek mora biti niz pa makar bio i jedan element
      pageSizeOptions={[10]}
      //onRowClick={handleRowClick}
      rows={response.data?.data ?? []}
      columns={columns}
    />
  );
};

export default Table;
