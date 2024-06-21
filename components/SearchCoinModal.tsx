"use client"

import React, { useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { Button, TextField } from "@mui/material"
import { ChevronRight } from "lucide-react"
import { useFormState } from "react-dom"
import { createAsset } from "@/app/actions/asset"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  p: 5,
}

export default function SearchModal({
  isOpen,
  handleClose,
  assets,
  portfolioId,
  loading,
}: {
  isOpen: boolean
  handleClose: any
  assets: Array<any>
  portfolioId: number
  loading: boolean
}) {
  const [searchAsset, setSearchAsset] = useState("")
  const createAssetWithId = createAsset.bind(null, portfolioId)

  const [state, formAction] = useFormState<any, FormData>(createAssetWithId, {})

  const filteredCoins = useMemo(
    () =>
      assets.filter(
        (asset) =>
          (asset.name.toLowerCase().includes(searchAsset) as string) ||
          asset.symbol
            .toLowerCase()
            .includes(searchAsset.toLowerCase() as string)
      ),
    [assets, searchAsset]
  )

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        className="flex flex-col rounded shadow-lg border-none"
        sx={{ ...style, height: assets && assets.length > 0 ? 400 : "auto" }}
      >
        {assets && assets.length > 0 ? (
          <>
            <div className="flex flex-col items-centers justify-center">
              <input
                className="w-full p-2 border-2 border-solid rounded"
                type="text"
                onChange={(e) => setSearchAsset(e.target.value)}
                placeholder="Search..."
                value={searchAsset}
              />
            </div>
            <div className="mt-3 overflow-auto">
              <div className="flex flex-col gap-1 mt-5 w-full">
                {filteredCoins.map((data) => (
                  <div
                    key={data.id}
                    className="flex justify-between items-center hover:bg-secondary-hover cursor-pointer p-2 rounded"
                  >
                    <div className="flex gap-2">
                      <span>{data.name}</span>
                      <span className="text-secondary-text">{data.symbol}</span>
                    </div>
                    <ChevronRight />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <form action={formAction}>
            <div className="flex gap-2 w-full">
              <TextField
                type="text"
                id="outlined-basic"
                label="Asset Name"
                variant="outlined"
                name="asset"
              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Symbol"
                variant="outlined"
                name="symbol"
              />
              <Button
                type="submit"
                variant="contained"
                style={{
                  width: "150px",
                  maxHeight: "100px",
                }}
              >
                Create
              </Button>
            </div>
            {state?.errorMessage && (
              <p className="text-secondary-red ml-5">{state.errorMessage}</p>
            )}
          </form>
        )}
      </Box>
    </Modal>
  )
}
