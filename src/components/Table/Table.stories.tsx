import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Table, type TableColumn, type TableProps } from "./Table";

interface Position {
  symbol: string;
  qty: number;
  avgPrice: number;
  last: number;
}

const rows: Position[] = [
  { symbol: "AAPL", qty: 10, avgPrice: 210.5, last: 231.14 },
  { symbol: "MSFT", qty: 4, avgPrice: 402.1, last: 398.2 },
  { symbol: "NVDA", qty: 25, avgPrice: 118.4, last: 132.77 },
];

const columns: TableColumn<Position>[] = [
  { key: "symbol", header: "Symbol", render: (row) => row.symbol },
  { key: "qty", header: "Qty", align: "right", render: (row) => row.qty },
  {
    key: "avgPrice",
    header: "Avg price",
    align: "right",
    render: (row) => `$${row.avgPrice.toFixed(2)}`,
  },
  {
    key: "pnl",
    header: "P/L",
    align: "right",
    render: (row) => {
      const pnl = (row.last - row.avgPrice) * row.qty;
      const positive = pnl >= 0;
      return (
        <Typography component="span" variant="body2" color={positive ? "success.main" : "error.main"}>
          {positive ? "+" : ""}
          {pnl.toFixed(2)}
        </Typography>
      );
    },
  },
];

function PositionsTable(props: TableProps<Position>) {
  return <Table<Position> {...props} />;
}

const meta: Meta<typeof PositionsTable> = {
  title: "Components/Table",
  component: PositionsTable,
  args: {
    columns,
    rows,
    getRowKey: (row: Position) => row.symbol,
  },
};

export default meta;
type Story = StoryObj<typeof PositionsTable>;

export const Positions: Story = {};

export const Empty: Story = {
  args: { rows: [], emptyMessage: "No open positions" },
};

const manyRows: Position[] = Array.from({ length: 40 }, (_, i) => ({
  symbol: `SYM${i + 1}`,
  qty: 5 + i,
  avgPrice: 100 + i * 3.1,
  last: 100 + i * 3.1 + (i % 2 === 0 ? 5.4 : -2.1),
}));

export const StickyHeader: Story = {
  args: {
    rows: manyRows,
    stickyHeader: true,
    sx: { maxHeight: 320 },
  },
};

const wideColumns: TableColumn<Position>[] = [
  { key: "symbol", header: "Symbol", frozen: true, render: (row) => row.symbol },
  { key: "qty", header: "Qty", align: "right", render: (row) => row.qty },
  { key: "avgPrice", header: "Avg price", align: "right", render: (row) => `$${row.avgPrice.toFixed(2)}` },
  { key: "last", header: "Last", align: "right", render: (row) => `$${row.last.toFixed(2)}` },
  { key: "exchange", header: "Exchange", render: () => "NASDAQ" },
  { key: "sector", header: "Sector", render: () => "Technology" },
  { key: "currency", header: "Currency", render: () => "USD" },
  { key: "notes", header: "Notes", render: () => "Long-term hold, reviewed quarterly" },
];

export const FrozenColumn: Story = {
  args: {
    columns: wideColumns,
    sx: { maxWidth: 480 },
  },
};

function PaginatedDemo() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const pageRows = manyRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Table<Position>
      columns={columns}
      rows={pageRows}
      getRowKey={(row) => row.symbol}
      pagination={{
        page,
        rowsPerPage,
        count: manyRows.length,
        onPageChange: setPage,
        onRowsPerPageChange: (next) => {
          setRowsPerPage(next);
          setPage(0);
        },
      }}
    />
  );
}

export const Pagination: Story = {
  render: () => <PaginatedDemo />,
};

export const ExpandableRows: Story = {
  args: {
    renderExpanded: (row: Position) => (
      <Typography variant="body2" color="text.secondary">
        {row.symbol}: {row.qty} shares acquired at an average of ${row.avgPrice.toFixed(2)}, last marked at $
        {row.last.toFixed(2)}.
      </Typography>
    ),
  },
};
