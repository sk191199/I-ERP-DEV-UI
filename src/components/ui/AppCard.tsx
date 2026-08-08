import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

export interface AppCardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * The only card surface allowed in the app.
 */
export function AppCard({
  title,
  subtitle,
  actions,
  footer,
  children,
  dense = false,
  disablePadding = false,
  sx,
}: AppCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{ display: "flex", flexDirection: "column", height: "100%", ...sx }}
    >
      {(title || actions) && (
        <>
          <CardHeader
            title={title}
            subheader={subtitle}
            action={actions}
            slotProps={{
              title: { variant: "h3" },
              subheader: { variant: "body2" },
            }}
            sx={{ py: dense ? 1.25 : 2 }}
          />
          <Divider />
        </>
      )}
      <CardContent
        sx={{
          flex: 1,
          ...(disablePadding
            ? { p: 0, "&:last-child": { pb: 0 } }
            : { p: dense ? 1.5 : 2.5, "&:last-child": { pb: dense ? 1.5 : 2.5 } }),
        }}
      >
        {children}
      </CardContent>
      {footer && (
        <>
          <Divider />
          <CardActions sx={{ px: 2, py: 1.25 }}>{footer}</CardActions>
        </>
      )}
    </Card>
  );
}
