import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import type { ReactNode } from "react";

export interface AppModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  footer?: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

/**
 * The only rich content modal allowed in the app (record editors, wizards,
 * detail panels). Becomes full screen on small viewports.
 */
export function AppModal({
  open,
  title,
  subtitle,
  size = "md",
  footer,
  children,
  onClose,
}: AppModalProps) {
  const fullScreen = useMediaQuery("(max-width:767.95px)");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle component="div" sx={{ py: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Stack sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h3" noWrap>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {subtitle}
              </Typography>
            )}
          </Stack>
          <IconButton onClick={onClose} size="small" aria-label="Close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 3 }}>{children}</DialogContent>
      {footer && (
        <>
          <Divider />
          <DialogActions sx={{ px: 3, py: 2 }}>{footer}</DialogActions>
        </>
      )}
    </Dialog>
  );
}
