import { prisma } from "@/lib/db"

type Asset = {
  name: string
  symbol: string
  network: string
  website: string
}

/** CREATE ASSET  */
export const createAsset = async ({
  name,
  symbol,
  network,
  website,
}: Asset) => {
  const newAsset = await prisma.asset.create({
    data: {
      name,
      symbol,
      network,
      website,
    },
  } as any)

  return newAsset
}
