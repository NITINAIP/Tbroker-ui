import * as React from "react";
import MuiBox from "@mui/material/Box";
import MuiCollapse from "@mui/material/Collapse";
import MuiIconButton from "@mui/material/IconButton";
import MuiTable from "@mui/material/Table";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableContainer, {
  type TableContainerProps as MuiTableContainerProps,
} from "@mui/material/TableContainer";
import MuiTableHead from "@mui/material/TableHead";
import MuiTablePagination from "@mui/material/TablePagination";
import MuiTableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export interface TableColumn<Row> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  render: (row: Row) => React.ReactNode;
  /** Pins this column while the table scrolls horizontally. Mark a contiguous run starting at column 0 — freezing a column without its predecessors frozen too produces overlapping content. */
  frozen?: boolean;
}

export interface TablePaginationConfig {
  page: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  /** Total row count across all pages — drives the "x–y of z" label and the last-page button. */
  count: number;
  rowsPerPageOptions?: number[];
}

export interface TableProps<Row> extends MuiTableContainerProps {
  columns: TableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => React.Key;
  emptyMessage?: React.ReactNode;
  /** Keeps the header row visible while the body scrolls. Pair with a bounded height, e.g. `sx={{ maxHeight: 480 }}`. */
  stickyHeader?: boolean;
  /** Renders an expand/collapse chevron per row; expanding shows this content full-width underneath. */
  renderExpanded?: (row: Row) => React.ReactNode;
  /** Controlled pagination — Table only renders the `TablePagination` control; slice `rows` to the current page yourself. */
  pagination?: TablePaginationConfig;
}

/**
 * Tbroker's data table. A generic, column-driven wrapper around MUI's
 * `Table` for rendering things like order books, positions, and watchlists.
 * Supports a sticky header, frozen leading columns, per-row expand/collapse
 * detail panels, and controlled pagination.
 */
export function Table<Row>({
  columns,
  rows,
  getRowKey,
  emptyMessage = "No data",
  stickyHeader = false,
  renderExpanded,
  pagination,
  ...props
}: TableProps<Row>) {
  const [expandedKeys, setExpandedKeys] = React.useState<ReadonlySet<React.Key>>(new Set());
  const headerCellRefs = React.useRef<Record<string, HTMLTableCellElement | null>>({});
  const [frozenOffsets, setFrozenOffsets] = React.useState<Record<string, number>>({});

  // Frozen column widths depend on rendered content, so measure them after
  // paint rather than trying to compute them from `columns` alone.
  React.useLayoutEffect(() => {
    const offsets: Record<string, number> = {};
    let cumulative = 0;
    for (const column of columns) {
      if (!column.frozen) break;
      offsets[column.key] = cumulative;
      cumulative += headerCellRefs.current[column.key]?.offsetWidth ?? 0;
    }
    setFrozenOffsets(offsets);
  }, [columns, rows]);

  const frozenSx = (key: string, zIndex: number) =>
    frozenOffsets[key] !== undefined
      ? { position: "sticky" as const, left: frozenOffsets[key], zIndex, backgroundColor: "background.paper" }
      : undefined;

  const toggleExpanded = (key: React.Key) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const columnCount = columns.length + (renderExpanded ? 1 : 0);

  return (
    <MuiBox>
      <MuiTableContainer {...props}>
        <MuiTable size="small" stickyHeader={stickyHeader}>
          <MuiTableHead>
            <MuiTableRow>
              {renderExpanded ? <MuiTableCell padding="checkbox" /> : null}
              {columns.map((column) => (
                <MuiTableCell
                  key={column.key}
                  align={column.align}
                  ref={(el: HTMLTableCellElement | null) => {
                    headerCellRefs.current[column.key] = el;
                  }}
                  sx={frozenSx(column.key, 3)}
                >
                  {column.header}
                </MuiTableCell>
              ))}
            </MuiTableRow>
          </MuiTableHead>
          <MuiTableBody>
            {rows.length === 0 ? (
              <MuiTableRow>
                <MuiTableCell colSpan={columnCount} align="center">
                  {emptyMessage}
                </MuiTableCell>
              </MuiTableRow>
            ) : (
              // Renders every row — for row sets over ~50, virtualize upstream
              // (e.g. `virtua` or `content-visibility: auto`) before passing `rows` in.
              rows.map((row, index) => {
                const rowKey = getRowKey(row, index);
                const expanded = expandedKeys.has(rowKey);
                return (
                  <React.Fragment key={rowKey}>
                    <MuiTableRow hover>
                      {renderExpanded ? (
                        <MuiTableCell padding="checkbox">
                          <MuiIconButton
                            size="small"
                            aria-label={expanded ? "Collapse row" : "Expand row"}
                            onClick={() => toggleExpanded(rowKey)}
                          >
                            {expanded ? (
                              <KeyboardArrowUpIcon fontSize="small" />
                            ) : (
                              <KeyboardArrowDownIcon fontSize="small" />
                            )}
                          </MuiIconButton>
                        </MuiTableCell>
                      ) : null}
                      {columns.map((column) => (
                        <MuiTableCell key={column.key} align={column.align} sx={frozenSx(column.key, 1)}>
                          {column.render(row)}
                        </MuiTableCell>
                      ))}
                    </MuiTableRow>
                    {renderExpanded ? (
                      <MuiTableRow>
                        <MuiTableCell colSpan={columnCount} sx={{ py: 0, borderBottom: expanded ? undefined : "none" }}>
                          <MuiCollapse in={expanded} timeout="auto" unmountOnExit>
                            <MuiBox sx={{ py: 2 }}>{renderExpanded(row)}</MuiBox>
                          </MuiCollapse>
                        </MuiTableCell>
                      </MuiTableRow>
                    ) : null}
                  </React.Fragment>
                );
              })
            )}
          </MuiTableBody>
        </MuiTable>
      </MuiTableContainer>
      {pagination ? (
        <MuiTablePagination
          component="div"
          count={pagination.count}
          page={pagination.page}
          onPageChange={(_event, newPage) => pagination.onPageChange(newPage)}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={(event) => pagination.onRowsPerPageChange(Number(event.target.value))}
          rowsPerPageOptions={pagination.rowsPerPageOptions ?? [10, 25, 50]}
        />
      ) : null}
    </MuiBox>
  );
}
