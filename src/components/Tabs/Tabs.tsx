import * as React from "react";
import MuiTab from "@mui/material/Tab";
import MuiTabs, { type TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import MuiBox from "@mui/material/Box";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends Omit<MuiTabsProps, "value" | "onChange" | "children"> {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Tbroker's tab strip with built-in panel rendering, e.g. switching between
 * "Positions" / "Orders" / "History" views.
 */
export const Tabs: React.FC<TabsProps> = ({ items, value, onChange, ...props }) => {
  const activeItem = items.find((item) => item.value === value);

  return (
    <MuiBox>
      <MuiTabs
        value={value}
        onChange={(_event, newValue: string) => onChange(newValue)}
        {...props}
      >
        {items.map((item) => (
          <MuiTab key={item.value} value={item.value} label={item.label} disabled={item.disabled} />
        ))}
      </MuiTabs>
      <MuiBox sx={{ pt: 2 }}>{activeItem?.content}</MuiBox>
    </MuiBox>
  );
};

Tabs.displayName = "Tabs";
