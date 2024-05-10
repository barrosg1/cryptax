"use client"

import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { Button, Popover } from "@mui/material"
import { tableData } from "@/data"
import { ArrowRightLeft, FileText, Grip, Plus, Trash2 } from "lucide-react"
import TransactionModal from "./TransactionModal"
import CardBox from "./CardBox"

interface Column {
  id: "asset" | "allocation" | "balance" | "value" | "webDetail" | "actions"
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

const columns: readonly Column[] = [
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
    id: "webDetail",
    label: "Web Detail",
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
]

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [modalOpen, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const popOpen = Boolean(anchorEl)
  const id = popOpen ? "simple-popover" : undefined

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handlePopClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopClose = () => {
    setAnchorEl(null)
  }

  return (
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
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id == "asset" && (
                            <div className="flex items-center gap-1">
                              <img
                                className="w-9"
                                src={row.asset.img}
                                alt={`${row.asset.img}-${i}`}
                              />
                              <p>{row.asset.name}</p>
                              <p className="text-secondary-text">
                                {row.asset.symbol}
                              </p>
                            </div>
                          )}
                          {column.id == "webDetail" && (
                            <Button
                              variant="contained"
                              href={row.webDetail}
                              target="_blank"
                            >
                              Go
                            </Button>
                          )}
                          {column.id !== "asset" &&
                            column.id !== "webDetail" && (
                              <p>
                                {column.id === "value" ? "$" : ""}
                                {value}
                              </p>
                            )}

                          {column.id === "actions" && (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
