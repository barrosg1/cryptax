import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await prisma.asset.findMany()

  return NextResponse.json({
    data,
  })
}

export async function POST(request: Request) {
  const data = await request.json()

  return NextResponse.json({
    data,
  })
}
