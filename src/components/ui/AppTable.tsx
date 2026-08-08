import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo, useState, type ReactNode } from "react";

export interface AppTableColumn<T> {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  value?: (row: T) => string | number;
}

export interface AppTableProps<T> {
  columns: AppTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  loading?: boolean;
  emptyMessage?: string;
  paginated?: boolean;
  rowsPerPageOptions?: number[];
  onRowClick?: (row: T) => void;
}

/**
 * The only data table allowed in the app. Metadata-driven: pass columns,
 * get sorting, pagination, loading and empty states for free.
 */
export function AppTable<T>({
  columns,
  rows,
  getRowId,
  loading = false,
  emptyMessage = "No records found",
  paginated = true,
  rowsPerPageOptions = [10, 25, 50],
  onRowClick,
}: AppTableProps<T>) {
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0] ?? 10);

  const sorted = useMemo(() => {
    if (!orderBy) return rows;
    const column = columns.find((c) => c.id === orderBy);
    if (!column?.value) return rows;
    const read = column.value;
    return [...rows].sort((a, b) => {
      const av = read(a);
      const bv = read(b);
      if (av === bv) return 0;
      return (av > bv ? 1 : -1) * (direction === "asc" ? 1 : -1);
    });
  }, [rows, columns, orderBy, direction]);

  const visible = paginated
    ? sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : sorted;

  const handleSort = (id: string) => {
    if (orderBy === id) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setOrderBy(id);
    setDirection("asc");
  };

  return (
    <Box>
      <TableContainer>
        <Table size="small" sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align ?? "left"}
                  sx={{ width: column.width }}
                  sortDirection={orderBy === column.id ? direction : false}
                >
                  {column.sortable && column.value ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? direction : "asc"}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading && visible.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ py: 6 }}>
                  <Typography align="center" variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              visible.map((row) => (
                <TableRow
                  key={getRowId(row)}
                  hover
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  sx={{ cursor: onRowClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align ?? "left"}>
                      {column.render
                        ? column.render(row)
                        : column.value
                          ? column.value(row)
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {paginated && (
        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={(_, next) => setPage(next)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(Number(event.target.value));
            setPage(0);
          }}
        />
      )}
    </Box>
  );
}
