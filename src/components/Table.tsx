import React from 'react';
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export type TableRowData = {
  id: string;
  data: React.ReactNode[]
};

type TableProps = {
  columnLabels?: React.ReactNode[];
  rows: TableRowData[];
};

const Table = ({ columnLabels = [], rows = [] }: TableProps) => {
  return (
    <TableContainer>
      <MuiTable>
        {!!columnLabels.length && <TableHead>
          <TableRow>
            {columnLabels.map((cell, index) => {
              return (<TableCell key={`header-row-cell-${index}`}>{cell}</TableCell>);
            })}
          </TableRow>
        </TableHead>}
        {!!rows.length && <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={`table-row-${row.id}`} >
                {row.data.map((cell, cellIndex) => {
                  return (
                    <TableCell key={`table-row-cell-${row.id}-${cellIndex}`}>{cell}</TableCell>
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
