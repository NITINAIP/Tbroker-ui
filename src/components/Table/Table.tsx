import * as React from "react";
import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer, {
  type TableContainerProps as MuiTableContainerProps,
} from "@mui/material/TableContainer";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";

export interface TableColumn<Row> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  render: (row: Row) => React.ReactNode;
}

export interface TableProps<Row> extends MuiTableContainerProps {
  columns: TableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => React.Key;
  emptyMessage?: React.ReactNode;
}

/**
 * Tbroker's data table. A generic, column-driven wrapper around MUI's
 * `Table` for rendering things like order books, positions, and watchlists.
 */
export function Table<Row>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No data",
  ...props
}: TableProps<Row>) {
  return (
    <MuiTableContainer {...props}>
      <MuiTable size="small">
        <MuiTableHead>
          <MuiTableRow>
            {columns.map((column) => (
              <MuiTableCell key={column.key} align={column.align}>
                {column.header}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {rows.length === 0 ? (
            <MuiTableRow>
              <MuiTableCell colSpan={columns.length} align="center">
                {emptyMessage}
              </MuiTableCell>
            </MuiTableRow>
          ) : (
            // Renders every row — for row sets over ~50, virtualize upstream
            // (e.g. `virtua` or `content-visibility: auto`) before passing `rows` in.
            rows.map((row, index) => (
              <MuiTableRow key={getRowKey(row, index)} hover>
                {columns.map((column) => (
                  <MuiTableCell key={column.key} align={column.align}>
                    {column.render(row)}
                  </MuiTableCell>
                ))}
              </MuiTableRow>
            ))
          )}
        </MuiTableBody>
      </MuiTable>
    </MuiTableContainer>
  );
}
