import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import type { ReactNode } from "react";
import { AppButton } from "./AppButton";

export interface AppDialogProps {
  open: boolean;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "primary" | "danger";
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * The only confirmation dialog allowed in the app (decisions, destructive
 * actions). For rich content surfaces use <AppModal>.
 */
export function AppDialog({
  open,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  loading = false,
  onConfirm,
  onClose,
}: AppDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {children}
      </DialogContent>
      <Divider />
      <DialogActions sx={{ px: 3, py: 2 }}>
        <AppButton emphasis="tertiary" tone="neutral" onClick={onClose}>
          {cancelLabel}
        </AppButton>
        <AppButton tone={tone} loading={loading} onClick={onConfirm}>
          {confirmLabel}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
