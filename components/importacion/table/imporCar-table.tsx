"use client";
import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/tables/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/tables/data-table-view-options";
import {
  useProfileGlobalFilter,
  useProfilePagination,
  useProfileSorting,
} from "./profiles-table.hooks";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { ImportacionCliente } from "../importList";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  pageCount: number;
}

export function ImportCarTable<TData, TValue>({
  columns,
  data,
  total,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const { pagination, setPagination } = useProfilePagination();
  const { sorting, setSorting } = useProfileSorting();

  const { globalFilter, setGlobalFilter, debouncedGlobalFilter } =
    useProfileGlobalFilter();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, _] = React.useState<VisibilityState>({
    id: false,
  });
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    state: {
      sorting,
      globalFilter: debouncedGlobalFilter,
      columnVisibility,
      columnFilters,
      pagination,
    },
  });

  function handleRowClick(row: ImportacionCliente) {
    const id = row.id_importacion_cliente;
    if (id) {
      router.push(`/dashboard/services/profile/${id}`);
    } else {
      return toast({
        title: "Algo ha salido mal.",
        description: "No se pudo acceder a la información de este perfil.",
        variant: "default",
      });
    }
  }

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 py-4">
        <Input
          type="search"
          placeholder="Buscar..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px] bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border bg-white dark:bg-gray-900">
        <Table className="text-base">
          <TableHeader className="bg-black dark:bg-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-black dark:hover:bg-black"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer text-primary"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={(event) => {
                    const target = event.target as HTMLElement;
                    const currentTarget = event.currentTarget as HTMLElement;

                    if (
                      target === currentTarget ||
                      target.tagName.toLowerCase() === "td"
                    ) {
                      handleRowClick(row.original as ImportacionCliente);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center p-2">
        <DataTablePagination table={table} total={total} />
      </div>
    </div>
  );
}
