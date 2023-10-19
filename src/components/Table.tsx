import React from 'react';
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export type TableCellData = {
  key: string;
  value: React.ReactNode;
};

export type TableRowData = {
  id: string;
  data: TableCellData[];
};

type TableProps = {
  columnLabels?: TableCellData[];
  rows: TableRowData[];
};

const Table = ({ columnLabels = [], rows = [] }: TableProps) => {
  return (
    <TableContainer>
      <MuiTable>
        {!!columnLabels.length && <TableHead>
          <TableRow>
            {columnLabels.map((cell) => {
              return (<TableCell key={cell.key}>{cell.value}</TableCell>);
            })}
          </TableRow>
        </TableHead>}
        {!!rows.length && <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row.id} >
                {row.data.map((cell) => {
                  return (
                    <TableCell key={`${row.id}-cell-${cell.key}`}>{cell.value}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>}
      </MuiTable>
    </TableContainer>
  );
};

export { Table };
