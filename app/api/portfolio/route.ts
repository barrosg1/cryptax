import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  let data = await prisma.portfolio.findMany({
    select: {
      id: true,
      assets: true,
      slug: true,
    },
  })

  return NextResponse.json({
    data,
  })
}
