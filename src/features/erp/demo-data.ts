import type { FormMeta } from "@/components/ui/AppForm";
import type { AppTableColumn } from "@/components/ui/AppTable";

export interface RecordRow {
  id: string;
  code: string;
  name: string;
  owner: string;
  status: "Draft" | "In review" | "Approved" | "Posted" | "Blocked";
  amount: number;
  updatedAt: string;
}

const OWNERS = [
  "Aarav Mehta",
  "Lena Fischer",
  "Diego Santos",
  "Priya Nair",
  "Tom Okafor",
  "Yuki Tanaka",
];
const STATUSES: RecordRow["status"][] = [
  "Draft",
  "In review",
  "Approved",
  "Posted",
  "Blocked",
];

/** Deterministic demo dataset so every ERP screen renders meaningful content. */
export function buildRecords(seed: string, count = 24): RecordRow[] {
  const base = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Array.from({ length: count }, (_, index) => {
    const n = base + index * 37;
    return {
      id: `${seed}-${index + 1}`,
      code: `${seed.slice(0, 3).toUpperCase()}-${1000 + (n % 8999)}`,
      name: `${seed.replace(/-/g, " ")} record ${index + 1}`,
      owner: OWNERS[n % OWNERS.length] as string,
      status: STATUSES[n % STATUSES.length] as RecordRow["status"],
      amount: 1500 + (n % 97) * 640,
      updatedAt: new Date(Date.UTC(2026, n % 12, (n % 27) + 1)).toISOString().slice(0, 10),
    };
  });
}

export const recordColumns: AppTableColumn<RecordRow>[] = [
  { id: "code", label: "Document", sortable: true, value: (r) => r.code, width: 140 },
  { id: "name", label: "Description", sortable: true, value: (r) => r.name },
  { id: "owner", label: "Owner", sortable: true, value: (r) => r.owner, width: 160 },
  { id: "status", label: "Status", sortable: true, value: (r) => r.status, width: 130 },
  {
    id: "amount",
    label: "Amount",
    align: "right",
    sortable: true,
    value: (r) => r.amount,
    render: (r) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(
        r.amount,
      ),
    width: 130,
  },
  {
    id: "updatedAt",
    label: "Updated",
    align: "right",
    sortable: true,
    value: (r) => r.updatedAt,
    width: 120,
  },
];

/** Metadata contract reused by every "create record" form across modules. */
export const recordFormMeta: FormMeta = {
  submitLabel: "Create record",
  sections: [
    {
      title: "General",
      description: "Header information used across the document lifecycle.",
      fields: [
        { name: "name", label: "Description", required: true, span: 6 },
        {
          name: "owner",
          label: "Responsible",
          type: "select",
          span: 6,
          required: true,
          options: OWNERS.map((owner) => ({ value: owner, label: owner })),
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          span: 4,
          options: STATUSES.map((status) => ({ value: status, label: status })),
        },
        { name: "amount", label: "Amount (EUR)", type: "number", span: 4 },
        { name: "date", label: "Document date", type: "date", span: 4 },
      ],
    },
    {
      title: "Compliance",
      fields: [
        { name: "email", label: "Notification email", type: "email", span: 6 },
        { name: "reference", label: "External reference", span: 6 },
        { name: "notes", label: "Internal notes", type: "textarea", span: 12 },
      ],
    },
  ],
};
