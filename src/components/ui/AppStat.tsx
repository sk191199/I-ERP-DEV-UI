import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { AppCard } from "@/components/ui/AppCard";

export interface AppStatProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  caption?: string;
}

/** KPI tile. Built on AppCard so no card UI is duplicated. */
export function AppStat({ label, value, delta, trend = "flat", caption }: AppStatProps) {
  const color = trend === "up" ? "success" : trend === "down" ? "error" : "default";
  return (
    <AppCard dense>
      <Stack spacing={1}>
        <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {label}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
          <Typography variant="h2">{value}</Typography>
          {delta && <Chip size="small" color={color} variant="outlined" label={delta} />}
        </Box>
        {caption && (
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
        )}
      </Stack>
    </AppCard>
  );
}
