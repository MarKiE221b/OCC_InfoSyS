import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const ReusableTable = ({
  data,
  columns,
  globalSearch = true,
  onRowAction,
  filterColumn, // pass the column id to filter (e.g., "status")
  filterOptions = [], // array of filter options (e.g., ["Active", "Inactive"])
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(5);
  const [columnFilter, setColumnFilter] = useState("");

  // Memoize columnFilters for react-table
  const columnFilters = useMemo(
    () =>
      columnFilter && filterColumn
        ? [{ id: filterColumn, value: columnFilter }]
        : [],
    [columnFilter, filterColumn]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      pagination: { pageIndex, pageSize },
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: () => {}, // required for controlled columnFilters
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, value) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(value.toLowerCase()),
    manualPagination: false,
  });

  return (
    <div className="p-4 bg-base-100 w-full overflow-x-auto">
      {/* Global Search */}
      {globalSearch && (
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
      )}

      {/* Filter Dropdown */}
      {filterColumn && filterOptions.length > 0 && (
        <select
          className="select select-bordered w-full mb-4"
          value={columnFilter}
          onChange={(e) => setColumnFilter(e.target.value)}
        >
          <option value="">All</option>
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
              {onRowAction && <th>Action</th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {onRowAction && (
                <td>
                  <button
                    className="btn btn-circle bg-base-100"
                    onClick={() => onRowAction(row.original)}
                  >
                    Action
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            type="button"
            onClick={() => {
              if (pageIndex > 0) setPageIndex(pageIndex - 1);
            }}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
          <button className="join-item btn">
            Page {pageIndex + 1} of {table.getPageCount()}
          </button>
          <button
            className="join-item btn"
            type="button"
            onClick={() => {
              if (pageIndex < table.getPageCount() - 1)
                setPageIndex(pageIndex + 1);
            }}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusableTable;
