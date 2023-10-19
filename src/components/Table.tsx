import React from 'react';
import {
  Table as MuiTable,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';


type TableProps = {
  columnLabels?: React.ReactNode[];
  rows: React.ReactNode[][];
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
        <TableBody>
          {rows.map((row, rowIndex) => {
            return (
              <TableRow key={`table-row-${rowIndex}`} >
                {row.map((cell, cellIndex) => {
                  return (
                    <TableCell key={`table-row-cell-${rowIndex}-${cellIndex}`}>{cell}</TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export { Table };
