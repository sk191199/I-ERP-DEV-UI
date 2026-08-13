import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import ArrowIcon from "@mui/icons-material/ArrowForwardOutlined";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppCard } from "@/components/ui/AppCard";
import { AppStat } from "@/components/ui/AppStat";
import { AppButton } from "@/components/ui/AppButton";
import { AppTable } from "@/components/ui/AppTable";
import { buildRecords, recordColumns } from "@/features/erp/demo-data";
import { useSession } from "@/features/auth/SessionProvider";

const approvals = [
  { id: "1", label: "PO-4821 · Capex hardware", owner: "Purchase", value: "€ 84,500" },
  { id: "2", label: "SO-9134 · Frame agreement", owner: "Sales", value: "€ 212,000" },
  { id: "3", label: "JE-2210 · Accrual reversal", owner: "Finance", value: "€ 18,340" },
  { id: "4", label: "LV-1187 · Leave request", owner: "HR", value: "5 days" },
];

const health = [
  { label: "Order fulfilment", value: 92 },
  { label: "Invoice automation", value: 78 },
  { label: "Inventory accuracy", value: 86 },
  { label: "Project on-time delivery", value: 64 },
];

export function DashboardPageBody() {
  const { user } = useSession();
  const rows = buildRecords("dashboard", 12);

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        <AppStat label="Revenue MTD" value="€ 4.82M" delta="+8.3%" trend="up" caption="vs. plan € 4.45M" />
        <AppStat label="Open receivables" value="€ 1.19M" delta="-4.2%" trend="down" caption="DSO 41 days" />
        <AppStat label="Inventory value" value="€ 2.64M" delta="+1.1%" trend="up" caption="Turns 6.2×" />
        <AppStat label="Pending approvals" value="27" delta="9 overdue" trend="down" caption="Across 6 modules" />
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
        }}
      >
        <AppCard
          title="Recent documents"
          subtitle="Latest activity across modules"
          disablePadding
          footer={
            <AppButton emphasis="tertiary" endIcon={<ArrowIcon />}>
              View all documents
            </AppButton>
          }
        >
          <AppTable
            columns={recordColumns}
            rows={rows}
            getRowId={(row) => row.id}
            paginated={false}
          />
        </AppCard>

        <Stack spacing={2}>
          <AppCard title="My approvals" dense>
            <Stack divider={<Divider flexItem />} spacing={1.25}>
              {approvals.map((item) => (
                <Stack key={item.id} spacing={0.25} sx={{ pt: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Chip size="small" variant="outlined" label={item.owner} />
                    <Typography variant="caption" color="text.secondary">
                      {item.value}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </AppCard>

          <AppCard title="Process health" dense>
            <Stack spacing={2}>
              {health.map((metric) => (
                <Box key={metric.label}>
                  <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {metric.label}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      {metric.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              ))}
            </Stack>
          </AppCard>
        </Stack>
      </Box>
    </Stack>
  );
}

export function DashboardPage() {
  const { user } = useSession();

  return (
    <MainLayout
      title="Executive Dashboard"
      description={`Welcome back, ${user.name}. Consolidated position across all operating modules.`}
      status="Period 08 / 2026"
      actions={
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap>
          <AppButton emphasis="secondary" tone="neutral">
            Change period
          </AppButton>
          <AppButton endIcon={<ArrowIcon />}>Open approvals</AppButton>
        </Stack>
      }
    >
      <DashboardPageBody />
    </MainLayout>
  );
}