import type { Meta, StoryObj } from "@storybook/react-vite";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RecordHeader } from "./RecordHeader";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { Table, type TableColumn } from "../Table/Table";
import { PersonCell } from "../PersonCell/PersonCell";

const meta: Meta<typeof RecordHeader> = {
  title: "Components/RecordHeader",
  component: RecordHeader,
  args: {
    breadcrumb: "Appointments / Thursday",
    title: "Yoga for beginners",
    description: "Good choice for beginners and experienced practitioners.",
    meta: [
      { label: "Date", value: "Thu, Feb 20" },
      { label: "Time", value: "9:00 – 10:00" },
      { label: "Room", value: "Room 2" },
      { label: "Capacity", value: "12 of 20" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof RecordHeader>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ width: 640 }}>
      <RecordHeader {...args} />
    </Box>
  ),
};

export const WithActions: Story = {
  render: (args) => (
    <Box sx={{ width: 640 }}>
      <RecordHeader
        {...args}
        onEditDescription={() => {}}
        actions={
          <>
            <IconButton size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
              🟠
            </IconButton>
            <Button variant="outlined" size="small">
              Reschedule
            </Button>
          </>
        }
      />
    </Box>
  ),
};

interface Participant {
  id: string;
  name: string;
  age: number;
  gender: string;
  membership: "Golden" | "Silver" | "Basic";
  confirmed: boolean;
}

const participants: Participant[] = [
  { id: "1", name: "Stella Cooper", age: 31, gender: "Female", membership: "Golden", confirmed: true },
  { id: "2", name: "Randall Howard", age: 39, gender: "Male", membership: "Silver", confirmed: true },
  { id: "3", name: "Max Murphy", age: 22, gender: "Male", membership: "Basic", confirmed: false },
  { id: "4", name: "Rosemary Watson", age: 25, gender: "Female", membership: "Basic", confirmed: false },
  { id: "5", name: "Annette Nguyen", age: 19, gender: "Female", membership: "Golden", confirmed: true },
  { id: "6", name: "Gregory Alexander", age: 45, gender: "Male", membership: "Basic", confirmed: true },
];

const membershipTint = {
  Golden: { color: "#8A6A16", bg: alpha("#F79009", 0.16) },
  Silver: { color: "#5A5248", bg: alpha("#8A8178", 0.16) },
  Basic: { color: "#3452B4", bg: alpha("#3452B4", 0.12) },
} as const;

const columns: TableColumn<Participant>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <PersonCell name={row.name} avatarText={row.name[0]} />,
  },
  { key: "age", header: "Age", render: (row) => row.age },
  { key: "gender", header: "Gender", render: (row) => row.gender },
  {
    key: "membership",
    header: "Membership",
    render: (row) => (
      <Chip
        label={row.membership}
        size="small"
        sx={{
          color: membershipTint[row.membership].color,
          bgcolor: membershipTint[row.membership].bg,
          fontWeight: 600,
        }}
      />
    ),
  },
  {
    key: "confirmed",
    header: "Confirmed?",
    render: (row) =>
      row.confirmed ? (
        <Typography component="span" variant="body2" sx={{ color: "success.main", fontWeight: 600 }}>
          ✓ Yes
        </Typography>
      ) : (
        <Typography component="span" variant="body2" color="text.disabled">
          No
        </Typography>
      ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: () => (
      <Stack direction="row" spacing={0.5} sx={{ justifyContent: "flex-end" }}>
        <IconButton size="small" aria-label="Call" title="Call">
          📞
        </IconButton>
        <IconButton size="small" aria-label="More actions" title="More">
          ⋯
        </IconButton>
      </Stack>
    ),
  },
];

/**
 * A full record-detail composition: `RecordHeader` + `Table` (participants,
 * using `PersonCell` and a membership `Chip`) + a side info panel, styled
 * with Tbroker's own theme tokens rather than any reference imagery.
 */
export const BookingDetail: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <Grid container spacing={3} sx={{ maxWidth: 1400, p: 3 }}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card>
          <RecordHeader
            breadcrumb="Appointments / Thursday"
            title="Yoga for beginners"
            description="Good choice for beginners and experienced practitioners."
            onEditDescription={() => {}}
            meta={[
              { label: "Date", value: "Thu, Feb 20" },
              { label: "Time", value: "9:00 – 10:00" },
              { label: "Room", value: "Room 2" },
              { label: "Capacity", value: "12 of 20" },
            ]}
            actions={
              <>
                <IconButton size="small" sx={{ border: "1px solid", borderColor: "divider" }}>
                  🟠
                </IconButton>
                <Button variant="outlined" size="small">
                  Reschedule
                </Button>
              </>
            }
          />
        </Card>

        <Box sx={{ mt: 3 }}>
          <Card
            title="Participants"
            action={
              <Button variant="outlined" size="small">
                + Add participant
              </Button>
            }
          >
            <Table columns={columns} rows={participants} getRowKey={(row) => row.id} />
          </Card>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <Stack spacing={1} sx={{ alignItems: "center", textAlign: "center" }}>
            <Typography variant="overline" color="text.disabled">
              Senior Master
            </Typography>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
              }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Amelia Rhodes
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Clients seen
            </Typography>
            <Typography variant="h5" color="primary.main">
              3,203
            </Typography>
            <Rating value={4.5} precision={0.5} size="small" readOnly />
            <Typography variant="caption" color="text.secondary">
              483 reviews
            </Typography>
          </Stack>
        </Card>

        <Box sx={{ mt: 3 }}>
          <Card title="Today's classes">
            <List disablePadding>
              {[
                { time: "9:00", label: "Yoga for beginners", room: "Small Room" },
                { time: "10:00", label: "Yoga flow", room: "Small Room" },
                { time: "13:00", label: "Yoga for seniors", room: "Room 1" },
                { time: "15:00", label: "Prenatal yoga", room: "Small Room" },
              ].map((item) => (
                <ListItem key={item.time} disablePadding sx={{ py: 0.75 }}>
                  <ListItemText
                    primary={`${item.time}  ${item.label}`}
                    secondary={item.room}
                    slotProps={{ primary: { variant: "body2", sx: { fontWeight: 600 } } }}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Box>
      </Grid>
    </Grid>
  ),
};
