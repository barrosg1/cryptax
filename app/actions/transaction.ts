"use server"

import { createAsset } from "@/lib/asset"
import { prisma } from "@/lib/db"
import validator from "validator"

/** CREATE BUY TRANSACTION  */
export const createBuyTransaction = async (
  prevState: any,
  formData: FormData
) => {
  const asset = formData.get("asset")
  const symbol = formData.get("symbol")
  const network = formData.get("network")
  const quantity = formData.get("quantity")
  const pricePerCoin = formData.get("pricePerCoin")
  const bought_date = formData.get("bought_date")
  const bought_time = formData.get("bought_time")
  const category = formData.get("category")
  const market_cap = formData.get("market_cap")
  const trading_platform = formData.get("trading_platform")
  const website = formData.get("website")
  const notes = formData.get("notes")

  const data = {
    asset: String(asset),
    symbol: String(symbol).toUpperCase(),
    network: String(network),
    website: String(website),
    quantity: Number(quantity),
    pricePerCoin: Number(pricePerCoin),
    bought_date: new Date(bought_date as string),
    bought_time: new Date(bought_time as string),
    category: String(category),
    market_cap: Number(market_cap),
    trading_platform: String(trading_platform),
    notes: String(notes),
  }

  const errors: string[] = []

  const validationSchema = [
    {
      valid: validator.isLength(data.asset, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Asset name is invalid",
    },
    {
      valid: validator.isLength(data.symbol, {
        min: 1,
        max: 9,
      }),
      errorMessage: "Symbol is invalid",
    },
    {
      valid: validator.isLength(data.category, {
        min: 1,
      }),
      errorMessage: "Category is invalid",
    },
  ]

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length) {
    return { errorMessage: errors[0] }
  }

  const newAsset = await createAsset({
    name: data.asset,
    symbol: data.symbol,
    network: data.network,
    website: data.website,
  })

  if (newAsset) {
    const result = await prisma.buyTransaction.create({
      data: {
        asset_id: newAsset.id,
        quantity: data.quantity,
        pricePerCoin: data.pricePerCoin,
        bought_date: data.bought_date,
        bought_time: data.bought_time,
        category: data.category,
        market_cap: data.market_cap,
        trading_platform: data.trading_platform,
        notes: data.notes,
      },
    })

    console.log("Buy Transaction Saved: ", result)
  } else {
    console.log("Buy Transaction Failed")
  }
}

/** CREATE SELL TRANSACTION */
export const createSellTransaction = async (
  prevState: any,
  formData: FormData
) => {
  const asset = formData.get("asset")
  const symbol = formData.get("symbol")
  const quantity = formData.get("quantity")
  const pricePerCoin = formData.get("pricePerCoin")
  const sold_date = formData.get("sold_date")
  const sold_time = formData.get("sold_time")
  const category = formData.get("category")
  const market_cap = formData.get("market_cap")
  const trading_platform = formData.get("trading_platform")
  const url = formData.get("url")
  const notes = formData.get("notes")

  const data = {
    asset: String(asset),
    symbol: String(symbol).toUpperCase(),
    quantity: Number(quantity),
    pricePerCoin: Number(pricePerCoin),
    sold_date: new Date(sold_date as string),
    sold_time: new Date(sold_time as string),
    category: String(category),
    market_cap: Number(market_cap),
    trading_platform: String(trading_platform),
    url: String(url),
    notes: String(notes),
  }

  // const result = await prisma.sellTransaction.create({
  //   data: {
  //     asset: String(asset),
  //     quantity: Number(quantity),
  //     pricePerCoin: Number(pricePerCoin),
  //     sold_date: new Date(String(sold_date)),
  //     sold_time: new Date(String(sold_time)),
  //     notes: String(notes),
  //   },
  // })

  const errors: any[] = []

  const validationSchema = [
    {
      valid: validator.isLength(data.asset, {
        min: 1,
        max: 20,
      }),
      errorName: "asset",
      errorMessage: "Asset name is invalid",
    },
    {
      valid: validator.isLength(data.symbol, {
        min: 1,
        max: 9,
      }),
      errorName: "symbol",
      errorMessage: "Symbol is invalid",
    },
    {
      valid: validator.isEmpty(data.category),
      errorMessage: "Category is required",
    },
  ]

  validationSchema.forEach((check) => {
    const { valid, errorName, errorMessage } = check
    if (!valid) {
      errors.push({ errorName, errorMessage })
    }
  })

  if (errors.length) {
    return {
      inputName: errors[0].errorName,
      errorMessage: errors[0].errorMessage,
    }
  }
}
