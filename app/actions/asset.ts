import { prisma } from "@/lib/db"
import { isEmpty } from "@/utils/shared"
import { revalidatePath } from "next/cache"

export async function createAsset(
  prevState: any,
  portfolioId: string,
  formData: FormData
) {
  let name = formData.get("asset")
  let symbol = formData.get("symbol")

  name = name ? (name as string) : ""
  symbol = symbol ? (symbol as string) : ""

  if (isEmpty(name)) {
    return { errorMessage: "Asset name is required" }
  }
  if (isEmpty(symbol)) {
    return { errorMessage: "Symbol is required" }
  }

  const newAsset = await prisma.asset.create({
    data: {
      name,
      symbol,
      portfolio_id: portfolioId,
    },
  })
  console.log("Asset Saved: ", newAsset)

  revalidatePath("/")
}
