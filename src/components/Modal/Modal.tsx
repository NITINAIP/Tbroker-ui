import * as React from "react";
import MuiDialog, { type DialogProps as MuiDialogProps } from "@mui/material/Dialog";
import MuiDialogActions from "@mui/material/DialogActions";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiIconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface ModalProps extends Omit<MuiDialogProps, "title"> {
  title?: React.ReactNode;
  actions?: React.ReactNode;
  onClose: NonNullable<MuiDialogProps["onClose"]>;
}

/**
 * Tbroker's dialog. Wraps MUI's `Dialog` with a title bar (including a
 * close button) and an actions row, matching confirm/cancel style flows
 * used for order confirmations and settings panels.
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  actions,
  onClose,
  children,
  maxWidth = "sm",
  fullWidth = true,
  ...props
}) => (
  <MuiDialog onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth} {...props}>
    {title ? (
      <MuiDialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {title}
        <MuiIconButton
          aria-label="close"
          size="small"
          onClick={(event) => onClose(event, "backdropClick")}
        >
          <CloseIcon fontSize="small" />
        </MuiIconButton>
      </MuiDialogTitle>
    ) : null}
    <MuiDialogContent dividers={Boolean(title)} sx={{ overscrollBehavior: "contain" }}>
      {children}
    </MuiDialogContent>
    {actions ? <MuiDialogActions>{actions}</MuiDialogActions> : null}
  </MuiDialog>
);

Modal.displayName = "Modal";
