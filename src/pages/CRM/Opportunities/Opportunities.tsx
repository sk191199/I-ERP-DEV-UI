
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import { AppCard } from "@/components/ui/AppCard";
import { AppStat } from "@/components/ui/AppStat";
import { AppButton } from "@/components/ui/AppButton";
import { AppTable, type AppTableColumn } from "@/components/ui/AppTable";

/* ============================================================
   TYPES
============================================================ */

interface Opportunity {
  id: string;
  name: string;
  company: string;
  owner: string;
  stage: string;
  value: number;
  probability: number;
  closeDate: string;
}

/* ============================================================
   DEMO DATA
============================================================ */

const opportunities: Opportunity[] = [
  {
    id: "opp-001",
    name: "Enterprise ERP Transformation",
    company: "Apex Manufacturing",
    owner: "SK",
    stage: "Proposal",
    value: 85000,
    probability: 78,
    closeDate: "2026-08-28",
  },
  {
    id: "opp-002",
    name: "Supply Chain Automation",
    company: "Vertex Logistics",
    owner: "RM",
    stage: "Negotiation",
    value: 62000,
    probability: 84,
    closeDate: "2026-08-24",
  },
  {
    id: "opp-003",
    name: "CRM Modernization",
    company: "Northstar Retail",
    owner: "AK",
    stage: "Qualified",
    value: 45000,
    probability: 55,
    closeDate: "2026-09-05",
  },
  {
    id: "opp-004",
    name: "Finance Platform Upgrade",
    company: "Summit Holdings",
    owner: "PS",
    stage: "Discovery",
    value: 28000,
    probability: 35,
    closeDate: "2026-09-18",
  },
  {
    id: "opp-005",
    name: "Warehouse Intelligence",
    company: "BluePeak Industries",
    owner: "SK",
    stage: "Proposal",
    value: 72000,
    probability: 71,
    closeDate: "2026-09-02",
  },
  {
    id: "opp-006",
    name: "Customer Experience Suite",
    company: "Orbit Systems",
    owner: "RM",
    stage: "Negotiation",
    value: 54000,
    probability: 88,
    closeDate: "2026-08-31",
  },
];

/* ============================================================
   CONSTANTS
============================================================ */

const stages = [
  "All Stages",
  "Discovery",
  "Qualified",
  "Proposal",
  "Negotiation",
];

const owners = ["All Owners", "SK", "RM", "AK", "PS"];

/* ============================================================
   HELPERS
============================================================ */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function getStageColor(
  stage: string,
): "default" | "primary" | "success" | "warning" | "info" {
  switch (stage) {
    case "Negotiation":
      return "success";

    case "Proposal":
      return "primary";

    case "Qualified":
      return "info";

    case "Discovery":
      return "warning";

    default:
      return "default";
  }
}

function getProbabilityColor(
  probability: number,
): "success" | "warning" | "error" {
  if (probability >= 70) {
    return "success";
  }

  if (probability >= 50) {
    return "warning";
  }

  return "error";
}

/* ============================================================
   PAGE
============================================================ */

export default function Opportunities() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All Stages");
  const [owner, setOwner] = useState("All Owners");

  /* ============================================================
     FILTERING
  ============================================================ */

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        !normalizedSearch ||
        opportunity.name.toLowerCase().includes(normalizedSearch) ||
        opportunity.company.toLowerCase().includes(normalizedSearch);

      const matchesStage =
        stage === "All Stages" || opportunity.stage === stage;

      const matchesOwner =
        owner === "All Owners" || opportunity.owner === owner;

      return matchesSearch && matchesStage && matchesOwner;
    });
  }, [search, stage, owner]);

  /* ============================================================
     TABLE COLUMNS
  ============================================================ */

  const columns: AppTableColumn<Opportunity>[] = [
    {
      id: "name",
      label: "Opportunity",
      sortable: true,
      width: "25%",
      value: (row) => row.name,
      render: (row) => (
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", minWidth: 0 }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: "0.75rem",
              fontWeight: 700,
              bgcolor: "primary.main",
            }}
          >
            {row.company.charAt(0)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {row.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {row.company}
            </Typography>
          </Box>
        </Stack>
      ),
    },

    {
      id: "owner",
      label: "Owner",
      sortable: true,
      width: "10%",
      value: (row) => row.owner,
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {row.owner}
        </Typography>
      ),
    },

    {
      id: "stage",
      label: "Stage",
      sortable: true,
      width: "15%",
      value: (row) => row.stage,
      render: (row) => (
        <Chip
          size="small"
          label={row.stage}
          color={getStageColor(row.stage)}
          variant="outlined"
          sx={{ fontWeight: 600 }}
        />
      ),
    },

    {
      id: "value",
      label: "Deal Value",
      sortable: true,
      align: "right",
      width: "15%",
      value: (row) => row.value,
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {formatCurrency(row.value)}
        </Typography>
      ),
    },

    {
      id: "probability",
      label: "Probability",
      sortable: true,
      align: "center",
      width: "12%",
      value: (row) => row.probability,
      render: (row) => (
        <Chip
          size="small"
          label={`${row.probability}%`}
          color={getProbabilityColor(row.probability)}
          variant="outlined"
          sx={{ fontWeight: 700 }}
        />
      ),
    },

    {
      id: "closeDate",
      label: "Close Date",
      sortable: true,
      width: "15%",
      value: (row) => row.closeDate,
      render: (row) => (
        <Typography variant="body2">
          {formatDate(row.closeDate)}
        </Typography>
      ),
    },
  ];

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {/* ========================================================
          PAGE INTRO
      ======================================================== */}

      {/* ========================================================
          KPI SECTION
      ======================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <AppStat
          label="Pipeline Value"
          value="$227.0k"
          delta="+32%"
          trend="up"
          caption="vs. previous period"
        />

        <AppStat
          label="Open Deals"
          value="24"
          delta="+5"
          trend="up"
          caption="Active opportunities"
        />

        <AppStat
          label="Avg Win Rate"
          value="66.5%"
          delta="+4%"
          trend="up"
          caption="Rolling 90-day average"
        />
      </Box>

      {/* ========================================================
          AI INSIGHTS
      ======================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        {/* Neural Deal Intelligence */}

        <AppCard
          sx={{
            height: "100%",
            borderColor: "divider",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: (theme) => theme.shadows[6],
            },
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                  color: "primary.main",
                  flexShrink: 0,
                }}
              >
                <BoltOutlinedIcon sx={{ fontSize: 26 }} />
              </Box>

              <Stack
                spacing={0.5}
                sx={{
                  alignItems: "flex-end",
                }}
              >
                <Chip
                  size="small"
                  label="AGENTIC STRATEGY"
                  sx={{
                    height: 22,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.04em",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                    color: "primary.main",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "error.main",
                    textTransform: "uppercase",
                  }}
                >
                  Priority: Critical
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.005em",
                  mb: 0.75,
                  textTransform: "uppercase",
                }}
              >
                Neural Deal Intelligence
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  color: "text.secondary",
                }}
              >
                High-value opportunities with greater than 70% win probability
                detected. Proposal dispatch recommended.
              </Typography>
            </Box>

            <AppButton
              onClick={() => {
                setStage("Proposal");
              }}
              sx={{
                alignSelf: "stretch",
                borderRadius: 999,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Fast-track deal
            </AppButton>
          </Stack>
        </AppCard>

        {/* Pipeline Risk Alert */}

        <AppCard
          sx={{
            height: "100%",
            borderColor: "divider",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: (theme) => theme.shadows[6],
            },
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.12),
                  color: "warning.main",
                  flexShrink: 0,
                }}
              >
                <WarningAmberOutlinedIcon sx={{ fontSize: 26 }} />
              </Box>

              <Stack
                spacing={0.5}
                sx={{
                  alignItems: "flex-end",
                }}
              >
                <Chip
                  size="small"
                  label="AGENTIC ALERT"
                  sx={{
                    height: 22,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    letterSpacing: "0.04em",
                    bgcolor: (theme) => alpha(theme.palette.warning.main, 0.15),
                    color: "warning.dark",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "error.main",
                    textTransform: "uppercase",
                  }}
                >
                  Priority: High
                </Typography>
              </Stack>
            </Stack>

            <Box>
              <Typography
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "0.005em",
                  mb: 0.75,
                  textTransform: "uppercase",
                }}
              >
                Pipeline Risk Alert
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.8125rem",
                  color: "text.secondary",
                }}
              >
                Opportunities approaching their close date without stage
                progress detected. Intervention recommended.
              </Typography>
            </Box>

            <AppButton
              onClick={() => {
                setStage("Negotiation");
              }}
              sx={{
                alignSelf: "stretch",
                borderRadius: 999,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Intervene now
            </AppButton>
          </Stack>
        </AppCard>
      </Box>

      {/* ========================================================
          PIPELINE TABLE
      ======================================================== */}

      <AppCard
        title="Opportunity Pipeline"
        subtitle={`${filteredOpportunities.length} active opportunities`}
        actions={
          <Chip
            size="small"
            icon={<TrendingUpOutlinedIcon />}
            label="Live Pipeline"
            color="success"
            variant="outlined"
          />
        }
      >
        <Stack spacing={2}>
          {/* Filters */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "minmax(220px, 2fr) repeat(2, minmax(150px, 1fr)) auto",
              },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search opportunity or company..."
              slotProps={{
                input: {
                  startAdornment: (
                    <SearchOutlinedIcon
                      sx={{
                        mr: 1,
                        color: "text.secondary",
                        fontSize: 20,
                      }}
                    />
                  ),
                },
              }}
            />

            <TextField
              select
              size="small"
              label="Stage"
              value={stage}
              onChange={(event) => setStage(event.target.value)}
            >
              {stages.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              size="small"
              label="Owner"
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
            >
              {owners.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <AppButton
              tone="neutral"
              emphasis="secondary"
              startIcon={<FilterAltOutlinedIcon />}
              onClick={() => {
                setSearch("");
                setStage("All Stages");
                setOwner("All Owners");
              }}
            >
              Clear
            </AppButton>
          </Box>

          <Divider />

          {/* Table */}

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <AppTable
              columns={columns}
              rows={filteredOpportunities}
              getRowId={(row) => row.id}
              paginated
              rowsPerPageOptions={[5, 10, 25]}
              emptyMessage="No opportunities match the selected filters."
              onRowClick={(row) => {
                console.log("Selected opportunity:", row);
              }}
            />
          </Box>
        </Stack>
      </AppCard>

      {/* ========================================================
          PIPELINE SUMMARY
      ======================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
        }}
      >
        <AppCard dense>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              WEIGHTED PIPELINE
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              $151.4k
            </Typography>

            <Typography variant="caption" color="success.main">
              +18.4% from previous period
            </Typography>
          </Stack>
        </AppCard>

        <AppCard dense>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              CLOSING THIS MONTH
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              $119.0k
            </Typography>

            <Typography variant="caption" color="text.secondary">
              8 opportunities
            </Typography>
          </Stack>
        </AppCard>

        <AppCard dense>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              HIGH PROBABILITY
            </Typography>

            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              12
            </Typography>

            <Typography variant="caption" color="success.main">
              Above 70% probability
            </Typography>
          </Stack>
        </AppCard>
      </Box>
    </Stack>
  );
}