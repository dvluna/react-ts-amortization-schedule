import React from 'react';
import {
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableBody,
  TableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
} from '@mui/material';


type TableProps = {
  columnLabels?: React.ReactNode[];
  rows: React.ReactNode[][];
};

const TableHead = ({ id, labels }: { labels: React.ReactNode[]; id: string; }) => {
  if (!labels.length) {
    return <></>;
  }

  return (
    <MuiTableHead>
      <MuiTableRow>
        {labels.map((cell, index) => <TableCell key={`header-${id}-${index}`}>{cell}</TableCell>)}
      </MuiTableRow>
    </MuiTableHead>
  );
};

const TableRow = ({ id, row }: { row: React.ReactNode[]; id: string; }) => {
  return (
    <MuiTableRow>
      {row.map((cell, index) => <TableCell key={`cell-${id}-${index}`}>{cell}</TableCell>)}
    </MuiTableRow>
  );
}

const Table = ({ columnLabels = [], rows = [] }: TableProps) => {
  const id = React.useId();

  return (
    <MuiTableContainer>
      <MuiTable>
        <TableHead labels={columnLabels} id={id} />
        <TableBody>
          {rows.map((row, index) => <TableRow row={row} id={id} key={`row-${id}-${index}`} />)}
        </TableBody>
      </MuiTable>
    </MuiTableContainer>
  );
};

export { Table };
