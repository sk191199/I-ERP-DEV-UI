import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/AddOutlined";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppButton } from "@/components/ui/AppButton";
import { AppCard } from "@/components/ui/AppCard";
import { AppTable } from "@/components/ui/AppTable";
import { AppModal } from "@/components/ui/AppModal";
import { AppDialog } from "@/components/ui/AppDialog";
import { AppForm } from "@/components/ui/AppForm";
import { AppInput } from "@/components/ui/AppInput";
import { AppStat } from "@/components/ui/AppStat";
import {
  buildRecords,
  recordColumns,
  recordFormMeta,
  type RecordRow,
} from "./demo-data";

export interface ModuleScreenProps {
  moduleLabel: string;
  screenLabel: string;
  seed: string;
}

const statusColor: Record<RecordRow["status"], "default" | "info" | "success" | "warning" | "error"> = {
  Draft: "default",
  "In review": "warning",
  Approved: "info",
  Posted: "success",
  Blocked: "error",
};

/**
 * Generic ERP list screen. Screens are configuration, not new UI — this single
 * component scales to hundreds of module views.
 */
export function ModuleScreen({ moduleLabel, screenLabel, seed }: ModuleScreenProps) {
  const [rows, setRows] = useState<RecordRow[]>(() => buildRecords(seed));
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (row) =>
          (!status || row.status === status) &&
          (!query ||
            `${row.code} ${row.name} ${row.owner}`
              .toLowerCase()
              .includes(query.toLowerCase())),
      ),
    [rows, query, status],
  );

  const total = filtered.reduce((sum, row) => sum + row.amount, 0);
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const columns = useMemo(
    () =>
      recordColumns.map((column) =>
        column.id === "status"
          ? {
              ...column,
              render: (row: RecordRow) => (
                <Chip size="small" variant="outlined" color={statusColor[row.status]} label={row.status} />
              ),
            }
          : column,
      ),
    [],
  );

  return (
    <MainLayout
      title={screenLabel}
      description={`${moduleLabel} · operational worklist with role-aware actions and audit-ready documents.`}
      status="Live"
      actions={
        <>
          <AppButton emphasis="secondary" tone="neutral" startIcon={<DownloadIcon />}>
            Export
          </AppButton>
          <AppButton
            emphasis="secondary"
            tone="danger"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            Archive
          </AppButton>
          <AppButton startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            New
          </AppButton>
        </>
      }
    >
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
          <AppStat label="Open documents" value={String(filtered.length)} delta="+6.4%" trend="up" caption="vs. previous period" />
          <AppStat label="Net value" value={money(total)} delta="+2.1%" trend="up" caption="Filtered selection" />
          <AppStat
            label="Pending approval"
            value={String(filtered.filter((r) => r.status === "In review").length)}
            delta="-3 items"
            trend="down"
            caption="SLA 48h"
          />
          <AppStat
            label="Blocked"
            value={String(filtered.filter((r) => r.status === "Blocked").length)}
            trend="flat"
            caption="Requires controller review"
          />
        </Box>

        <AppCard
          title="Worklist"
          subtitle="Sort, filter and drill into documents"
          disablePadding
          actions={
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Box sx={{ width: { xs: "100%", sm: 220 } }}>
                <AppInput
                  placeholder="Filter worklist…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </Box>
              <Box sx={{ width: { xs: "100%", sm: 170 } }}>
                <AppInput
                  label="Status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  options={[
                    { value: "", label: "All statuses" },
                    { value: "Draft", label: "Draft" },
                    { value: "In review", label: "In review" },
                    { value: "Approved", label: "Approved" },
                    { value: "Posted", label: "Posted" },
                    { value: "Blocked", label: "Blocked" },
                  ]}
                />
              </Box>
            </Stack>
          }
        >
          <AppTable
            columns={columns}
            rows={filtered}
            getRowId={(row) => row.id}
            emptyMessage="No documents match the current filters"
          />
        </AppCard>

        <Typography variant="caption" color="text.secondary">
          Data shown is representative sample data for the {moduleLabel} module.
        </Typography>
      </Stack>

      <AppModal
        open={createOpen}
        title={`New ${screenLabel.toLowerCase()} document`}
        subtitle="Metadata-driven form — fields are declared as configuration"
        onClose={() => setCreateOpen(false)}
      >
        <AppForm
          meta={recordFormMeta}
          submitting={submitting}
          onCancel={() => setCreateOpen(false)}
          onSubmit={(values) => {
            setSubmitting(true);
            const created: RecordRow = {
              id: `${seed}-new-${rows.length + 1}`,
              code: `NEW-${1000 + rows.length}`,
              name: values["name"] ?? "Untitled",
              owner: values["owner"] ?? "Unassigned",
              status: (values["status"] as RecordRow["status"]) || "Draft",
              amount: Number(values["amount"] ?? 0),
              updatedAt: new Date().toISOString().slice(0, 10),
            };
            setRows((prev) => [created, ...prev]);
            setSubmitting(false);
            setCreateOpen(false);
          }}
        />
      </AppModal>

      <AppDialog
        open={confirmOpen}
        tone="danger"
        title="Archive selected documents?"
        description="Archived documents remain available in the audit trail but are removed from active worklists."
        confirmLabel="Archive"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
      />
    </MainLayout>
  );
}
