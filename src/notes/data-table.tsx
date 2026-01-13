import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"

import { columns } from "@/notes/columns"

/* ============================
   Types
============================ */

export type Note = {
  id: string
  patient: string
  date: string
  summary: string
  status: "Draft" | "Reviewed" | "Submitted"
}

type ApiResponse = {
  items: Note[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/* ============================
   Component
============================ */

export function DataTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const { data, isPending, error, isFetching } = useQuery<ApiResponse>({
    queryKey: ["notes", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/notes?page=${
              pagination.pageIndex + 1
          }&limit=${pagination.pageSize}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch notes")
      }

      return res.json()
    },
  })

  const table = useReactTable<Note>({
    data: data?.items ?? [],
    columns,
    pageCount: data?.totalPages ?? -1,
    state: { pagination },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  })

  /* ============================
     States
  ============================ */

  if (isPending) {
    return <div className="p-4">Loading…</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Failed to load data</div>
  }

  /* ============================
     Render
  ============================ */

  return (
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                      <TableHead
                          key={header.id}
                          className="bg-zinc-200 text-center"
                      >
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                      </TableHead>
                  ))}
                </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                          <TableCell
                              key={cell.id}
                              className="truncate text-center"
                          >
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                          </TableCell>
                      ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                  <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex gap-2">
            <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="border px-2 py-1 rounded"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>

            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border px-2 py-1 rounded"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border px-2 py-1 rounded"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="border px-2 py-1 rounded"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>

          <span>
          Page{" "}
            <strong>
            {pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>

          <select
              value={pagination.pageSize}
              onChange={(e) =>
                  table.setPageSize(Number(e.target.value))
              }
              className="border px-2 py-1 rounded"
          >
            {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
            ))}
          </select>
        </div>

        {isFetching && (
            <div className="px-2 pb-2 text-sm text-gray-500">
              Updating…
            </div>
        )}
      </div>
  )
}
