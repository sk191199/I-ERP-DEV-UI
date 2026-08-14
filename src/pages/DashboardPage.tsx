import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import { MainLayout } from "@/components/layout/MainLayout";
import { AppButton } from "@/components/ui/AppButton";
import { PRIMARY, ACCENT, SUCCESS_BG, DANGER_BG, BORDER, TEXT_SECONDARY } from "@/theme/theme";

/* ============================================================
   DEMO DATA
============================================================ */

const kpis = [
  {
    label: "Revenue",
    value: "$1,245,000.00",
    delta: "+12.4%",
    trend: "up" as const,
    icon: AttachMoneyIcon,
  },
  {
    label: "Expenses",
    value: "$785,200.00",
    delta: "-3.1%",
    trend: "down" as const,
    icon: AccountBalanceWalletIcon,
  },
  {
    label: "Net Profit",
    value: "$459,800.00",
    delta: "+18.6%",
    trend: "up" as const,
    icon: CreditCardIcon,
  },
  {
    label: "Cash Balance",
    value: "$312,450.00",
    delta: "+6.2%",
    trend: "up" as const,
    icon: MonitorHeartIcon,
  },
];

const monthlyPerformance = [
  { label: "JAN", value: 22 },
  { label: "FEB", value: 68 },
  { label: "MAR", value: 32 },
  { label: "APR", value: 88 },
  { label: "MAY", value: 60 },
  { label: "JUN", value: 100 },
  { label: "JUL", value: 78 },
  { label: "AUG", value: 90 },
  { label: "SEP", value: 40 },
  { label: "OCT", value: 82 },
  { label: "NOV", value: 26 },
  { label: "DEC", value: 92 },
];

const auditLogs = [
  { name: "ASTRA STRUCTURES", ref: "INV-9901 · REVENUE", amount: "$154,200", status: "PAID" },
  { name: "STEEL-WORKS INT", ref: "PO-4412 · PAYABLE", amount: "$82,000", status: "PENDING" },
  { name: "HORIZON LOGISTICS", ref: "QT-7708 · QUOTE", amount: "$12,500", status: "DRAFT" },
];

const strategySteps = [
  { label: "Market Volatility Analysis", icon: CheckCircleOutlineIcon, active: false },
  { label: "Risk Mitigation Strategy", icon: ShowChartIcon, active: true },
  { label: "Execution Approval", icon: ShieldOutlinedIcon, active: false },
];

const intelligenceItems = [
  {
    title: "Liquidity Forecast",
    text: "Predicted 12% increase in Q3 liquidity due to early receivables settlement.",
  },
  {
    title: "Risk Exposure",
    text: "High sensitivity detected in raw material pricing for UAE projects.",
  },
  {
    title: "Operational Pulse",
    text: "Overall efficiency up by 8.4% across regional hubs.",
  },
];

const activityStream = [
  {
    initial: "S",
    name: "SARAH KONG",
    role: "SALES LEAD",
    action: "Drafted quotation",
    ref: "QT-4402",
    value: "$154.2K",
    time: "2m ago",
  },
  {
    initial: "A",
    name: "AI ENGINE",
    role: "AUTONOMOUS",
    action: "Verified vendor compliance",
    ref: "V991",
    value: "PASS",
    time: "12m ago",
  },
  {
    initial: "M",
    name: "M. AHMED",
    role: "PROCUREMENT",
    action: "Approved purchase order",
    ref: "PO-331",
    value: "$8.4K",
    time: "45m ago",
  },
];

/* ============================================================
   SHARED SURFACE STYLE
============================================================ */

const surfaceSx = {
  borderRadius: "24px",
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: "0 12px 40px rgba(15,23,42,.06)",
  p: { xs: 2.5, md: 3 },
  transition: "transform 200ms ease, box-shadow 200ms ease",
  "&:hover": {
    transform: "translateY(-3px) scale(1.01)",
    boxShadow: "0 20px 55px rgba(15,23,42,.12)",
  },
};

/* ============================================================
   KPI CARD
============================================================ */

function KpiCard({ label, value, delta, trend, icon: Icon }: (typeof kpis)[number]) {
  const isUp = trend === "up";
  return (
    <Box sx={surfaceSx}>
      <Stack spacing={2.5}>
        <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              display: "grid",
              placeItems: "center",
              bgcolor: alpha(TEXT_SECONDARY, 0.08),
              color: "text.primary",
            }}
          >
            <Icon />
          </Box>

          <Chip
            size="small"
            icon={isUp ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
            label={delta}
            sx={{
              height: 26,
              fontWeight: 700,
              fontSize: "0.75rem",
              bgcolor: isUp ? SUCCESS_BG : DANGER_BG,
              color: isUp ? "#16A34A" : ACCENT,
              "& .MuiChip-icon": { color: "inherit", ml: "6px" },
            }}
          />
        </Stack>

        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            sx={{ color: TEXT_SECONDARY, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}
          >
            {label}
          </Typography>
          <Typography sx={{ fontSize: "1.65rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
            {value}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: PRIMARY }} />
          <Typography variant="caption" sx={{ color: TEXT_SECONDARY }}>
            AI forecast: Updated just now
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

/* ============================================================
   DASHBOARD BODY
============================================================ */

export function DashboardPageBody() {
  const maxPerformance = Math.max(...monthlyPerformance.map((m) => m.value));

  return (
    <Stack spacing={{ xs: 2.5, md: 3 }}>
      {/* ==========================================================
          KPI ROW
      ========================================================== */}
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, md: 2.5 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </Box>

      {/* ==========================================================
          COMMERCIAL PERFORMANCE + PENDING APPROVALS
      ========================================================== */}
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
          alignItems: "start",
        }}
      >
        <Box sx={surfaceSx}>
          <Stack spacing={3}>
            <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  Commercial Performance
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: TEXT_SECONDARY, fontWeight: 700, letterSpacing: "0.06em" }}
                >
                  AGGREGATED REVENUE VS FORECAST
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: PRIMARY }} />
                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: "0.04em" }}>
                  ACTUAL
                </Typography>
              </Stack>
            </Stack>

            {/* Bar chart */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                gap: { xs: 0.75, sm: 1.5 },
                height: 220,
              }}
            >
              {monthlyPerformance.map((month) => (
                <Stack key={month.label} spacing={1} sx={{ flex: 1, alignItems: "center", height: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      flex: 1,
                      display: "flex",
                      alignItems: "flex-end",
                      borderRadius: "10px",
                      bgcolor: alpha(TEXT_SECONDARY, 0.08),
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: `${(month.value / maxPerformance) * 100}%`,
                        borderRadius: "10px",
                        background: `linear-gradient(180deg, ${alpha(PRIMARY, 0.55)} 0%, ${PRIMARY} 100%)`,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: TEXT_SECONDARY, fontWeight: 700, fontSize: "0.65rem" }}
                  >
                    {month.label}
                  </Typography>
                </Stack>
              ))}
            </Box>

            <Box sx={{ borderTop: "1px solid", borderColor: "divider", pt: 2.5 }}>
              <Typography sx={{ fontWeight: 800, fontSize: "0.95rem", mb: 1.5 }}>
                High Value Audit Logs
              </Typography>
              <Stack spacing={1.25}>
                {auditLogs.map((log) => (
                  <Stack
                    key={log.ref}
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: "16px",
                      bgcolor: alpha(TEXT_SECONDARY, 0.05),
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "12px",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                          color: PRIMARY,
                          flexShrink: 0,
                        }}
                      >
                        <DescriptionOutlinedIcon fontSize="small" />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }} noWrap>
                          {log.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: TEXT_SECONDARY }} noWrap>
                          {log.ref}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack sx={{ alignItems: "flex-end", flexShrink: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>{log.amount}</Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#16A34A", fontWeight: 800, letterSpacing: "0.04em" }}
                      >
                        {log.status}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>

        {/* PENDING APPROVALS + NEURAL STRATEGY */}
        <Stack spacing={2.5}>
          <Box sx={surfaceSx}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>Pending Approvals</Typography>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "8px",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: ACCENT,
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                    }}
                  >
                    1
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.02em" }}>
                    SALES APPROVALS
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1.5}>
                <AppButton fullWidth>Approve</AppButton>
                <AppButton
                  fullWidth
                  sx={{
                    bgcolor: ACCENT,
                    "&:hover": { bgcolor: "#E11D4B" },
                  }}
                >
                  Review
                </AppButton>
              </Stack>
            </Stack>
          </Box>

          <Box sx={surfaceSx}>
            <Stack spacing={2.5}>
              <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: alpha(PRIMARY, 0.1),
                    color: PRIMARY,
                  }}
                >
                  <SmartToyOutlinedIcon />
                </Box>
                <Chip
                  size="small"
                  label="NEURAL STRATEGY"
                  sx={{
                    height: 24,
                    fontWeight: 800,
                    fontSize: "0.65rem",
                    letterSpacing: "0.03em",
                    bgcolor: PRIMARY,
                    color: "#fff",
                  }}
                />
              </Stack>

              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: "1rem", mb: 0.5 }}>
                  Market Anomaly Detection.
                </Typography>
                <Typography variant="body2" sx={{ color: TEXT_SECONDARY }}>
                  Autonomous data stream analysis indicates a{" "}
                  <Box component="span" sx={{ color: PRIMARY, fontWeight: 700 }}>
                    12.4% price surge
                  </Box>{" "}
                  for raw steel. Immediate hedging recommended.
                </Typography>
              </Box>

              <Stack spacing={1}>
                {strategySteps.map((step) => (
                  <Stack
                    key={step.label}
                    direction="row"
                    spacing={1.25}
                    sx={{
                      alignItems: "center",
                      p: 1.25,
                      borderRadius: "14px",
                      bgcolor: step.active ? alpha(PRIMARY, 0.08) : alpha(TEXT_SECONDARY, 0.05),
                      color: step.active ? PRIMARY : "text.primary",
                    }}
                  >
                    <step.icon fontSize="small" />
                    <Typography sx={{ fontWeight: 700, fontSize: "0.8rem" }}>{step.label}</Typography>
                  </Stack>
                ))}
              </Stack>

              <AppButton startIcon={<BoltIcon />}>Execute Mitigation</AppButton>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* ==========================================================
          EXECUTIVE INTELLIGENCE + ACTIVITY STREAM
      ========================================================== */}
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) minmax(0, 2fr)" },
          alignItems: "stretch",
        }}
      >
        <Box sx={surfaceSx}>
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <TrendingUpIcon sx={{ color: PRIMARY }} />
              <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>Executive Intelligence</Typography>
            </Stack>

            <Stack spacing={2.5}>
              {intelligenceItems.map((item) => (
                <Stack key={item.title} direction="row" spacing={1.5}>
                  <Box sx={{ width: 3, borderRadius: 3, bgcolor: PRIMARY, flexShrink: 0 }} />
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: TEXT_SECONDARY, mt: 0.25 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Box sx={surfaceSx}>
          <Stack spacing={2.5}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: "0.95rem" }}>Activity Stream</Typography>
              <Typography
                variant="caption"
                sx={{ color: TEXT_SECONDARY, fontWeight: 700, letterSpacing: "0.06em" }}
              >
                UNIFIED NEURAL AUDIT LOG
              </Typography>
            </Box>

            <Stack divider={<Box sx={{ borderBottom: "1px solid", borderColor: BORDER }} />} spacing={2}>
              {activityStream.map((entry) => (
                <Stack
                  key={entry.ref}
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "center", justifyContent: "space-between", pb: 2 }}
                >
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", minWidth: 0 }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        bgcolor: alpha(TEXT_SECONDARY, 0.1),
                        color: "text.primary",
                        fontWeight: 800,
                      }}
                    >
                      {entry.initial}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>{entry.name}</Typography>
                        <Typography variant="caption" sx={{ color: TEXT_SECONDARY }}>
                          · {entry.role}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ color: TEXT_SECONDARY }} noWrap>
                        {entry.action}{" "}
                        <Box component="span" sx={{ color: PRIMARY, fontWeight: 700 }}>
                          {entry.ref}
                        </Box>
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack sx={{ alignItems: "flex-end", flexShrink: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>{entry.value}</Typography>
                    <Typography variant="caption" sx={{ color: TEXT_SECONDARY }}>
                      {entry.time}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Box>

      {/* ==========================================================
          NEURAL AI INSIGHT BANNER
      ========================================================== */}
      <Box sx={surfaceSx}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", minWidth: 0 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                display: "grid",
                placeItems: "center",
                bgcolor: alpha(PRIMARY, 0.1),
                color: PRIMARY,
                flexShrink: 0,
              }}
            >
              <SmartToyOutlinedIcon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{ color: PRIMARY, fontWeight: 800, letterSpacing: "0.04em" }}
              >
                NEURAL AI INSIGHT
              </Typography>
              <Typography variant="body2">
                Inventory for{" "}
                <Box component="span" sx={{ color: PRIMARY, fontWeight: 700 }}>
                  Sensor Module
                </Box>{" "}
                may run out in 5 days. Recommended: Create a PO for{" "}
                <Box component="span" sx={{ color: PRIMARY, fontWeight: 700 }}>
                  100 units
                </Box>
                .
              </Typography>
            </Box>
          </Stack>

          <AppButton
            sx={{
              bgcolor: "#0F172A",
              flexShrink: 0,
              "&:hover": { bgcolor: "#1E293B" },
            }}
          >
            Generate PO
          </AppButton>
        </Stack>
      </Box>
    </Stack>
  );
}

export function DashboardPage() {
  return (
    <MainLayout title="" description="" actions={undefined}>
      <Stack spacing={0.5} sx={{ mb: { xs: 1, md: 1.5 } }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: PRIMARY }} />
          <Typography
            variant="caption"
            sx={{ color: PRIMARY, fontWeight: 800, letterSpacing: "0.08em" }}
          >
            INTELLIGENCE HUB
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
        >
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, letterSpacing: "-0.02em" }}>
              Management Console
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_SECONDARY, mt: 0.25 }}>
              Real-time enterprise metrics and proactive agentive insights.
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "16px",
              px: 2,
              py: 1,
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: TEXT_SECONDARY, fontWeight: 700, letterSpacing: "0.04em" }}
            >
              FISCAL PERIOD:{" "}
              <Box component="span" sx={{ color: PRIMARY, fontWeight: 800 }}>
                Q1 FY2026
              </Box>
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <DashboardPageBody />
    </MainLayout>
  );
}