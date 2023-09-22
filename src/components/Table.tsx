import React from 'react';
import {
  Table as MuiTable,
  TableContainer as MuiTableContainer,
  TableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow
} from '@mui/material';


type TableProps = {
  title?: React.ReactNode;
  columnLabels?: React.ReactNode[];
  rows: React.ReactNode[][];
};

const TableHead = ({ labels }: { labels: React.ReactNode[]; }) => {
  const uniqueId = React.useId();

  if (!labels.length) {
    return <></>;
  }

  return (
    <MuiTableHead>
      {labels.map((cell, index) => <TableCell key={`header-${uniqueId}-${index}`}>{cell}</TableCell>)}
    </MuiTableHead>
  );
};

const TableRow = ({ row }: { row: React.ReactNode[]; }) => {
  const id = React.useId();

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
        <TableHead labels={columnLabels} />
        {rows.map((row, index) => <TableRow row={row} key={`row-${id}-${index}`} />)}
      </MuiTable>
    </MuiTableContainer>
  );
};

export { Table };
