import AddIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import PrintIcon from "@mui/icons-material/PrintOutlined";
import ViewIcon from "@mui/icons-material/VisibilityOutlined";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppDialog } from "@/components/ui/AppDialog";
import { AppStat } from "@/components/ui/AppStat";
import { AppTable, type AppTableColumn } from "@/components/ui/AppTable";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Disqualified";

interface LeadRow {
  id: string;
  leadName: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  score: number;
  assignedTo: string;
  createdDate: string;
}

const initialLeads: LeadRow[] = [
  { id: "LD-1001", leadName: "Aarav Mehta", company: "BlueOrbit Tech", email: "aarav.m@blueorbit.io", phone: "+91-98765-12001", source: "Website", status: "New", score: 62, assignedTo: "Priya Sharma", createdDate: "2026-08-01" },
  { id: "LD-1002", leadName: "Mia Rodriguez", company: "NorthWind Logistics", email: "mia.rodriguez@northwind.com", phone: "+1-312-555-0142", source: "Referral", status: "Qualified", score: 88, assignedTo: "Liam Walker", createdDate: "2026-08-01" },
  { id: "LD-1003", leadName: "Noah Bennett", company: "Apex Retail Group", email: "noah.bennett@apexretail.co", phone: "+44-20-7946-0113", source: "LinkedIn", status: "Contacted", score: 71, assignedTo: "Priya Sharma", createdDate: "2026-08-02" },
  { id: "LD-1004", leadName: "Zara Khan", company: "GreenField Foods", email: "zara.khan@greenfieldfoods.com", phone: "+971-50-110-2244", source: "Campaign", status: "Disqualified", score: 34, assignedTo: "Arjun Rao", createdDate: "2026-08-02" },
  { id: "LD-1005", leadName: "Ethan Cole", company: "Vertex Manufacturing", email: "ethan.cole@vertexmfg.com", phone: "+1-646-555-0188", source: "Website", status: "Qualified", score: 91, assignedTo: "Liam Walker", createdDate: "2026-08-03" },
  { id: "LD-1006", leadName: "Ananya Iyer", company: "Skyline Infra", email: "ananya.iyer@skylineinfra.in", phone: "+91-99888-41006", source: "Partner", status: "Contacted", score: 67, assignedTo: "Arjun Rao", createdDate: "2026-08-03" },
  { id: "LD-1007", leadName: "Oliver Schmidt", company: "Helios Energy", email: "oliver.schmidt@heliosenergy.de", phone: "+49-30-9988-2211", source: "Referral", status: "New", score: 59, assignedTo: "Priya Sharma", createdDate: "2026-08-04" },
  { id: "LD-1008", leadName: "Sofia Rossi", company: "Italica Design House", email: "sofia.rossi@italica.it", phone: "+39-06-8899-7744", source: "Website", status: "Qualified", score: 84, assignedTo: "Arjun Rao", createdDate: "2026-08-04" },
  { id: "LD-1009", leadName: "Jacob Lee", company: "Pacific Biomed", email: "jacob.lee@pacificbiomed.sg", phone: "+65-8123-9054", source: "Event", status: "Disqualified", score: 29, assignedTo: "Liam Walker", createdDate: "2026-08-05" },
  { id: "LD-1010", leadName: "Fatima Al Mansoor", company: "DesertLink Trading", email: "fatima.alm@desertlink.ae", phone: "+971-55-331-0199", source: "LinkedIn", status: "Contacted", score: 73, assignedTo: "Priya Sharma", createdDate: "2026-08-05" },
];

const statusColor: Record<LeadStatus, "default" | "info" | "success" | "warning" | "error"> = {
  New: "default",
  Contacted: "info",
  Qualified: "success",
  Disqualified: "error",
};

type ConfirmDialogState =
  | { type: "single"; id: string }
  | { type: "bulk" }
  | null;

const LeadsPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<LeadRow[]>(initialLeads);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmState, setConfirmState] = useState<ConfirmDialogState>(null);

  const selectedCount = selectedIds.size;
  const allVisibleSelected = rows.length > 0 && selectedCount === rows.length;
  const someVisibleSelected = selectedCount > 0 && selectedCount < rows.length;

  const totalLeads = rows.length;
  const qualifiedLeads = rows.filter((row) => row.status === "Qualified").length;
  const disqualifiedLeads = rows.filter((row) => row.status === "Disqualified").length;
  const averageLeadScore =
    rows.length > 0
      ? (rows.reduce((total, row) => total + row.score, 0) / rows.length).toFixed(1)
      : "0.0";

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds(new Set());
      return;
    }
    setSelectedIds(new Set(rows.map((row) => row.id)));
  };

  const deleteRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const deleteSelected = () => {
    setRows((prev) => prev.filter((row) => !selectedIds.has(row.id)));
    setSelectedIds(new Set());
  };

  const handleView = (lead: LeadRow) => {
    console.info("TODO: navigate to lead details page", lead.id);
  };

  const handleEdit = (lead: LeadRow) => {
    console.info("TODO: navigate to lead edit page", lead.id);
  };

  const handlePrint = (lead: LeadRow) => {
    console.info("TODO: print lead", lead.id);
  };

  const handlePrintSelected = () => {
    console.info("TODO: print selected leads", Array.from(selectedIds));
  };

  const columns = useMemo<AppTableColumn<LeadRow>[]>(
    () => [
      {
        id: "select",
        label: "Select",
        width: 72,
        render: (row) => (
          <Checkbox
            size="small"
            checked={selectedIds.has(row.id)}
            onChange={() => toggleRow(row.id)}
            slotProps={{ input: { "aria-label": `Select ${row.leadName}` } }}
          />
        ),
      },
      { id: "id", label: "Lead ID", sortable: true, value: (row) => row.id },
      { id: "leadName", label: "Lead Name", sortable: true, value: (row) => row.leadName },
      { id: "company", label: "Company", sortable: true, value: (row) => row.company },
      { id: "email", label: "Email", value: (row) => row.email },
      { id: "phone", label: "Phone", value: (row) => row.phone },
      { id: "source", label: "Lead Source", sortable: true, value: (row) => row.source },
      {
        id: "status",
        label: "Status",
        sortable: true,
        value: (row) => row.status,
        render: (row) => (
          <Chip size="small" variant="outlined" color={statusColor[row.status]} label={row.status} />
        ),
      },
      { id: "score", label: "Lead Score", align: "right", sortable: true, value: (row) => row.score },
      { id: "assignedTo", label: "Assigned To", sortable: true, value: (row) => row.assignedTo },
      { id: "createdDate", label: "Created Date", sortable: true, value: (row) => row.createdDate },
      {
        id: "actions",
        label: "Actions",
        width: 196,
        render: (row) => (
          <Stack direction="row" spacing={0.25} sx={{ flexWrap: "nowrap", whiteSpace: "nowrap", alignItems: "center" }}>
            <Tooltip title="View">
              <IconButton size="small" aria-label={`View ${row.leadName}`} onClick={() => handleView(row)}>
                <ViewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton size="small" aria-label={`Edit ${row.leadName}`} onClick={() => handleEdit(row)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                aria-label={`Delete ${row.leadName}`}
                color="error"
                onClick={() => setConfirmState({ type: "single", id: row.id })}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton size="small" aria-label={`Print ${row.leadName}`} onClick={() => handlePrint(row)}>
                <PrintIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [selectedIds],
  );

  return (
    <Stack spacing={{ xs: 2, md: 3 }}>
      {/*  */}

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
        <AppStat label="Total Leads" value={String(totalLeads)} caption="Active local dataset" />
        <AppStat label="Qualified Leads" value={String(qualifiedLeads)} caption="Status = Qualified" trend="up" />
        <AppStat label="Disqualified Leads" value={String(disqualifiedLeads)} caption="Status = Disqualified" trend="down" />
        <AppStat label="Average Lead Score" value={averageLeadScore} caption="Across all leads" />
      </Box>

      {selectedCount > 0 && (
        <AppCard
          dense
          title={`${selectedCount} selected`}
          actions={
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <AppButton
                emphasis="secondary"
                tone="danger"
                startIcon={<DeleteIcon />}
                onClick={() => setConfirmState({ type: "bulk" })}
              >
                Delete Selected
              </AppButton>
              <AppButton emphasis="secondary" tone="neutral" startIcon={<PrintIcon />} onClick={handlePrintSelected}>
                Print Selected
              </AppButton>
            </Stack>
          }
        />
      )}

      <AppCard
        title="Leads Worklist"
        subtitle="Track, qualify and process incoming CRM leads"
        disablePadding
        actions={
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={allVisibleSelected}
                indeterminate={someVisibleSelected}
                onChange={toggleSelectAllVisible}
              />
            }
            label="Select all visible"
          />
        }
      >
        <AppTable
          columns={columns}
          rows={rows}
          getRowId={(row) => row.id}
          paginated={false}
          emptyMessage="No leads available"
        />
      </AppCard>

      <AppDialog
        open={Boolean(confirmState)}
        tone="danger"
        title={
          confirmState?.type === "bulk"
            ? "Delete selected leads?"
            : "Delete lead?"
        }
        description={
          confirmState?.type === "bulk"
            ? `This will remove ${selectedCount} selected leads from the local list.`
            : "This lead will be removed from the local list."
        }
        confirmLabel="Delete"
        onClose={() => setConfirmState(null)}
        onConfirm={() => {
          if (confirmState?.type === "single") {
            deleteRow(confirmState.id);
          } else if (confirmState?.type === "bulk") {
            deleteSelected();
          }
          setConfirmState(null);
        }}
      />
    </Stack>
  );
};

export default LeadsPage;
