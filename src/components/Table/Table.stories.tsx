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
