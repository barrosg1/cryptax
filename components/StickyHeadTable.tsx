"use client"

import React, { useState } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { Button, Popover } from "@mui/material"
import { ArrowRightLeft, FileText, Grip, Plus, Trash2 } from "lucide-react"
import TransactionModal from "./TransactionModal"
import CardBox from "./ui/CardBox"
import { Column, StickyHeadTableProps } from "@/types/types"

const columns: Column[] = [
  { id: "asset", label: "Assets", minWidth: 150 },
  { id: "allocation", label: "Portfolio Allocation", minWidth: 100 },
  {
    id: "balance",
    label: "Balance",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "value",
    label: "Value",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "website",
    label: "Website",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 150,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
] as const

export default function StickyHeadTable({
  data,
  isOverview,
}: StickyHeadTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [modalOpen, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const popOpen = Boolean(anchorEl)
  const id = popOpen ? "simple-popover" : undefined

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handlePopClick = (event: any) => setAnchorEl(event.currentTarget)
  const handlePopClose = () => setAnchorEl(null)
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      {data && data.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* <div className="flex flex-col float-right ">
              <h1>This portfolio needs some final touches…</h1>
              <Button type="submit" className="mt-10" variant="outlined">
                + Add Coin
              </Button>
            </div> */}

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, i: number) => {
                    console.log(row)
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column) => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id == "asset" && (
                                <div className="flex items-center gap-1">
                                  {/* <img
                            className="w-9"
                            src={row.asset.img}
                            alt={`${row.asset.img}-${i}`}
                          /> */}
                                  <p>{row.name}</p>
                                  <p className="text-secondary-text">
                                    {row.symbol}
                                  </p>
                                </div>
                              )}
                              {column.id == "website" &&
                              row.website !== "null" ? (
                                <Button
                                  variant="contained"
                                  href={row.website}
                                  target="_blank"
                                >
                                  Go
                                </Button>
                              ) : null}
                              {column.id !== "asset" &&
                                column.id !== "website" && (
                                  <p>
                                    {column.id === "value" && row.value
                                      ? "$"
                                      : ""}
                                    {value}
                                  </p>
                                )}

                              {!isOverview && column.id === "actions" && (
                                <div className="flex gap-4 float-right">
                                  <Plus
                                    onClick={handleOpen}
                                    className="hover:text-secondary-text hover:cursor-pointer"
                                  />
                                  {modalOpen && (
                                    <TransactionModal
                                      isOpen={modalOpen}
                                      handleClose={handleClose}
                                    />
                                  )}
                                  <div>
                                    <Grip
                                      className="hover:text-secondary-text hover:cursor-pointer"
                                      onClick={handlePopClick}
                                    >
                                      Open Popover
                                    </Grip>
                                    <Popover
                                      id={id}
                                      open={popOpen}
                                      anchorEl={anchorEl}
                                      onClose={handlePopClose}
                                      anchorOrigin={{
                                        vertical: "center",
                                        horizontal: "left",
                                      }}
                                    >
                                      <CardBox>
                                        <div className="flex flex-col gap-4 p-1">
                                          <div className="flex gap-4 hover:bg-secondary-hover p-1 cursor-pointer rounded">
                                            <FileText />
                                            <p>View Transactions</p>
                                          </div>
                                          <div className="flex gap-4 hover:bg-secondary-hover p-1 cursor-pointer rounded">
                                            <ArrowRightLeft />
                                            <p>Move Asset</p>
                                          </div>
                                          <div className="flex gap-4 hover:bg-secondary-hover p-1 cursor-pointer rounded">
                                            <Trash2 />
                                            <p>Remove</p>
                                          </div>
                                        </div>
                                      </CardBox>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {data && data.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      )}
    </>
  )
}
