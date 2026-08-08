import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  status?: string;
  actions?: ReactNode;
}

/** Standard page title block used by every screen through MainLayout. */
export function PageHeader({ title, description, status, actions }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0,1fr)", sm: "minmax(0,1fr) auto" },
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
          <Typography variant="h1" noWrap>
            {title}
          </Typography>
          {status && <Chip size="small" color="primary" variant="outlined" label={status} />}
        </Stack>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions && (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {actions}
        </Stack>
      )}
    </Box>
  );
}
