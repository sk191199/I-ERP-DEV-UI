import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import { AppCard } from "@/components/ui/AppCard";
import { AppStat } from "@/components/ui/AppStat";
import { AppButton } from "@/components/ui/AppButton";
import { AppTable, type AppTableColumn } from "@/components/ui/AppTable";

/* ============================================================
   TYPES
============================================================ */

type OpportunityStage =
  | "Qualification"
  | "Proposal"
  | "Negotiation"
  | "Contract"
  | "Closed Won";

type OpportunityStatus = "On Track" | "At Risk" | "Delayed";

interface Opportunity {
  id: string;
  name: string;
  company: string;
  owner: string;
  initials: string;
  value: number;
  probability: number;
  stage: OpportunityStage;
  status: OpportunityStatus;
  expectedClose: string;
}

/* ============================================================
   MOCK DATA
   Replace this later with Redux/API data.
============================================================ */

const opportunities: Opportunity[] = [
  {
    id: "OPP-1001",
    name: "Enterprise ERP Implementation",
    company: "Global Manufacturing Ltd",
    owner: "Sasi Kumar",
    initials: "SK",
    value: 185000,
    probability: 80,
    stage: "Negotiation",
    status: "On Track",
    expectedClose: "Aug 22, 2026",
  },
  {
    id: "OPP-1002",
    name: "CRM Digital Transformation",
    company: "Apex Technologies",
    owner: "Rahul Sharma",
    initials: "RS",
    value: 125000,
    probability: 65,
    stage: "Proposal",
    status: "On Track",
    expectedClose: "Aug 28, 2026",
  },
  {
    id: "OPP-1003",
    name: "Supply Chain Automation",
    company: "Prime Logistics",
    owner: "Priya Rao",
    initials: "PR",
    value: 95000,
    probability: 45,
    stage: "Qualification",
    status: "At Risk",
    expectedClose: "Sep 05, 2026",
  },
  {
    id: "OPP-1004",
    name: "Finance Automation Suite",
    company: "Vertex Financial",
    owner: "Arjun Kumar",
    initials: "AK",
    value: 150000,
    probability: 75,
    stage: "Contract",
    status: "On Track",
    expectedClose: "Aug 19, 2026",
  },
  {
    id: "OPP-1005",
    name: "HR Management Platform",
    company: "NextGen Services",
    owner: "Anitha Reddy",
    initials: "AR",
    value: 72000,
    probability: 30,
    stage: "Proposal",
    status: "Delayed",
    expectedClose: "Sep 15, 2026",
  },
  {
    id: "OPP-1006",
    name: "Inventory Optimization",
    company: "Metro Retail",
    owner: "Vikram Singh",
    initials: "VS",
    value: 68000,
    probability: 55,
    stage: "Negotiation",
    status: "On Track",
    expectedClose: "Sep 02, 2026",
  },
];

/* ============================================================
   HELPERS
============================================================ */

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const statusColor = (
  status: OpportunityStatus,
): "success" | "warning" | "error" => {
  switch (status) {
    case "On Track":
      return "success";
    case "At Risk":
      return "warning";
    case "Delayed":
      return "error";
  }
};

const stageColor = (
  stage: OpportunityStage,
):
  | "primary"
  | "secondary"
  | "warning"
  | "success"
  | "default" => {
  switch (stage) {
    case "Qualification":
      return "default";
    case "Proposal":
      return "primary";
    case "Negotiation":
      return "secondary";
    case "Contract":
      return "warning";
    case "Closed Won":
      return "success";
  }
};

/* ============================================================
   OPPORTUNITIES PAGE
============================================================ */

export default function Opportunities() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<OpportunityStage | "All">(
    "All",
  );

  const [statusFilter, setStatusFilter] = useState<
    OpportunityStatus | "All"
  >("All");

  /* ==========================================================
     FILTERED DATA
  ========================================================== */

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const searchMatch =
        search.trim() === "" ||
        opportunity.name.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.company.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.owner.toLowerCase().includes(search.toLowerCase());

      const stageMatch =
        stageFilter === "All" || opportunity.stage === stageFilter;

      const statusMatch =
        statusFilter === "All" || opportunity.status === statusFilter;

      return searchMatch && stageMatch && statusMatch;
    });
  }, [search, stageFilter, statusFilter]);

  /* ==========================================================
     KPI CALCULATIONS
  ========================================================== */

  const totalPipeline = opportunities.reduce(
    (sum, opportunity) => sum + opportunity.value,
    0,
  );

  const weightedPipeline = opportunities.reduce(
    (sum, opportunity) =>
      sum + opportunity.value * (opportunity.probability / 100),
    0,
  );

  const activeDeals = opportunities.length;

  const atRiskDeals = opportunities.filter(
    (opportunity) => opportunity.status === "At Risk",
  ).length;

  const closingSoon = opportunities.filter(
    (opportunity) =>
      opportunity.stage === "Contract" ||
      opportunity.stage === "Negotiation",
  ).length;

  /* ==========================================================
     TABLE COLUMNS
  ========================================================== */

  const columns: AppTableColumn<Opportunity>[] = [
    {
      id: "opportunity",
      label: "Opportunity",
      width: "25%",
      sortable: true,
      value: (row) => row.name,
      render: (row) => (
        <Stack
          direction="row"
          spacing={1.25}
          sx={{ alignItems: "center", minWidth: 0 }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              fontSize: "0.75rem",
              fontWeight: 700,
            }}
          >
            {row.initials}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600 }}
              noWrap
              title={row.name}
            >
              {row.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
              title={row.company}
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
      width: "13%",
      sortable: true,
      value: (row) => row.owner,
    },

    {
      id: "value",
      label: "Value",
      width: "12%",
      align: "right",
      sortable: true,
      value: (row) => row.value,
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatCurrency(row.value)}
        </Typography>
      ),
    },

    {
      id: "probability",
      label: "Probability",
      width: "15%",
      sortable: true,
      value: (row) => row.probability,
      render: (row) => (
        <Stack spacing={0.5}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="caption">
              {row.probability}%
            </Typography>

            <Typography variant="caption" color="text.secondary">
              weighted
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={row.probability}
            sx={{
              height: 5,
              borderRadius: 10,
            }}
          />
        </Stack>
      ),
    },

    {
      id: "stage",
      label: "Stage",
      width: "13%",
      sortable: true,
      value: (row) => row.stage,
      render: (row) => (
        <Chip
          size="small"
          label={row.stage}
          color={stageColor(row.stage)}
          variant="outlined"
        />
      ),
    },

    {
      id: "status",
      label: "Status",
      width: "11%",
      sortable: true,
      value: (row) => row.status,
      render: (row) => (
        <Chip
          size="small"
          label={row.status}
          color={statusColor(row.status)}
          variant="outlined"
        />
      ),
    },

    {
      id: "close",
      label: "Expected Close",
      width: "13%",
      value: (row) => row.expectedClose,
      render: (row) => (
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <CalendarTodayOutlinedIcon
            sx={{
              fontSize: 15,
              color: "text.secondary",
            }}
          />

          <Typography variant="caption">
            {row.expectedClose}
          </Typography>
        </Stack>
      ),
    },

    {
      id: "actions",
      label: "",
      width: 50,
      align: "center",
      render: () => (
        <Tooltip title="More actions">
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <MoreHorizOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      {/* ======================================================
          KPI SECTION
      ====================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <AppStat
          label="Total Pipeline"
          value={formatCurrency(totalPipeline)}
          delta="+12.8%"
          trend="up"
          caption="vs previous period"
        />

        <AppStat
          label="Weighted Pipeline"
          value={formatCurrency(weightedPipeline)}
          delta="+8.4%"
          trend="up"
          caption="probability adjusted"
        />

        <AppStat
          label="Active Opportunities"
          value={String(activeDeals)}
          delta="+3"
          trend="up"
          caption="new opportunities this period"
        />

        <AppStat
          label="At Risk"
          value={String(atRiskDeals)}
          delta={atRiskDeals > 0 ? "Attention" : "Healthy"}
          trend={atRiskDeals > 0 ? "down" : "up"}
          caption={`${closingSoon} deals nearing closure`}
        />
      </Box>

      {/* ======================================================
          AI INSIGHTS + PIPELINE HEALTH
      ====================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.4fr 1fr",
          },
          gap: 2,
        }}
      >
        {/* AI INSIGHTS */}

        <AppCard
          title="AI Insights"
          subtitle="Signals detected across the current opportunity pipeline."
          actions={
            <Chip
              size="small"
              icon={<EmojiObjectsOutlinedIcon />}
              label="AI Assisted"
              color="primary"
              variant="outlined"
            />
          }
        >
          <Stack spacing={2}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "action.hover",
              }}
            >
              <Stack direction="row" spacing={1.25}>
                <TrendingUpOutlinedIcon
                  color="success"
                  sx={{ mt: 0.25 }}
                />

                <Box>
                  <Typography variant="subtitle2">
                    Strong negotiation momentum
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Two high-value opportunities are currently in
                    negotiation and have an estimated combined value of{" "}
                    {formatCurrency(
                      opportunities
                        .filter(
                          (item) => item.stage === "Negotiation",
                        )
                        .reduce((sum, item) => sum + item.value, 0),
                    )}
                    .
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "action.hover",
              }}
            >
              <Stack direction="row" spacing={1.25}>
                <TrendingDownOutlinedIcon
                  color="warning"
                  sx={{ mt: 0.25 }}
                />

                <Box>
                  <Typography variant="subtitle2">
                    Attention required
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {atRiskDeals} opportunity
                    {atRiskDeals !== 1 ? "ies are" : " is"} currently
                    flagged as at risk. Review next actions and expected
                    close dates.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: "action.hover",
              }}
            >
              <Stack direction="row" spacing={1.25}>
                <AttachMoneyOutlinedIcon
                  color="primary"
                  sx={{ mt: 0.25 }}
                />

                <Box>
                  <Typography variant="subtitle2">
                    Revenue opportunity
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    The current weighted pipeline represents{" "}
                    {formatCurrency(weightedPipeline)} of expected
                    revenue.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </AppCard>

        {/* PIPELINE HEALTH */}

        <AppCard
          title="Pipeline Health"
          subtitle="Current opportunity distribution by stage."
        >
          <Stack spacing={2}>
            {(
              [
                "Qualification",
                "Proposal",
                "Negotiation",
                "Contract",
                "Closed Won",
              ] as OpportunityStage[]
            ).map((stage) => {
              const stageItems = opportunities.filter(
                (item) => item.stage === stage,
              );

              const stageValue = stageItems.reduce(
                (sum, item) => sum + item.value,
                0,
              );

              const percentage =
                totalPipeline === 0
                  ? 0
                  : (stageValue / totalPipeline) * 100;

              return (
                <Box key={stage}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", mb: 0.75 }}
                  >
                    <Typography variant="body2">
                      {stage}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {formatCurrency(stageValue)}
                    </Typography>
                  </Stack>

                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 7,
                      borderRadius: 10,
                    }}
                  />

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 0.5 }}
                  >
                    {stageItems.length} opportunity
                    {stageItems.length !== 1 ? "ies" : ""}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </AppCard>
      </Box>

      {/* ======================================================
          OPPORTUNITY WORKLIST
      ====================================================== */}

      <AppCard
        title="Opportunity Pipeline"
        subtitle="Monitor active deals, pipeline health and revenue opportunities."
        actions={
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Chip
              size="small"
              label={`${filteredOpportunities.length} records`}
              variant="outlined"
            />

            <AppButton
              emphasis="secondary"
              tone="neutral"
              startIcon={<ArrowForwardOutlinedIcon />}
            >
              View reports
            </AppButton>
          </Stack>
        }
        disablePadding
      >
        {/* FILTER BAR */}

        <Box sx={{ px: 2.5, py: 2 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
          >
            <TextField
              size="small"
              placeholder="Search opportunities..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{
                flex: 1,
                minWidth: 220,
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              select
              size="small"
              label="Stage"
              value={stageFilter}
              onChange={(event) =>
                setStageFilter(
                  event.target.value as OpportunityStage | "All",
                )
              }
              sx={{
                minWidth: { xs: "100%", md: 170 },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              <MenuItem value="All">All stages</MenuItem>
              <MenuItem value="Qualification">
                Qualification
              </MenuItem>
              <MenuItem value="Proposal">Proposal</MenuItem>
              <MenuItem value="Negotiation">Negotiation</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
              <MenuItem value="Closed Won">Closed Won</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as OpportunityStatus | "All",
                )
              }
              sx={{
                minWidth: { xs: "100%", md: 150 },
              }}
            >
              <MenuItem value="All">All statuses</MenuItem>
              <MenuItem value="On Track">On Track</MenuItem>
              <MenuItem value="At Risk">At Risk</MenuItem>
              <MenuItem value="Delayed">Delayed</MenuItem>
            </TextField>

            <AppButton
              emphasis="secondary"
              tone="neutral"
              onClick={() => {
                setSearch("");
                setStageFilter("All");
                setStatusFilter("All");
              }}
            >
              Reset
            </AppButton>
          </Stack>
        </Box>

        <Divider />

        {/* TABLE */}

        <Box sx={{ px: { xs: 1, sm: 1.5 }, pb: 1 }}>
          <AppTable
            columns={columns}
            rows={filteredOpportunities}
            getRowId={(row) => row.id}
            paginated
            rowsPerPageOptions={[5, 10, 25]}
            emptyMessage="No opportunities match the selected filters."
            onRowClick={(row) => {
              console.log("Opportunity selected:", row.id);
            }}
          />
        </Box>
      </AppCard>
    </Stack>
  );
}