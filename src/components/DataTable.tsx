import React from 'react';
import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export type DataTableCell = {
  key: string;
  value: React.ReactNode;
};

export type DataTableRow = {
  id: string;
  data: DataTableCell[];
};

type DataTableProps = {
  columnLabels?: DataTableCell[];
  rows: DataTableRow[];
};

const DataTable = ({ columnLabels = [], rows = [] }: DataTableProps) => {
  return (
    <TableContainer>
      <Table>
        {!!columnLabels.length && (
          <TableHead>
            <TableRow>
              {columnLabels.map((cell) => {
                return <TableCell key={cell.key}>{cell.value}</TableCell>;
              })}
            </TableRow>
          </TableHead>
        )}
        {!!rows.length && (
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.data.map((cell) => {
                    return <TableCell key={`${row.id}-cell-${cell.key}`}>{cell.value}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export { DataTable };
