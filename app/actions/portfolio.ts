"use server"

import { prisma } from "@/lib/db"
import { convertSlug, isEmpty } from "@/utils/shared"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPortfolio(prevState: any, formData: FormData) {
  let name = formData.get("portfolioName")
  name = name ? (name as string) : ""

  if (isEmpty(name)) {
    return { errorMessage: "Portfolio name is required" }
  }

  const formattedSlug = convertSlug(name)

  const slug = await prisma.portfolio.findUnique({
    where: {
      slug: formattedSlug,
    },
  })

  if (slug) {
    return { errorMessage: "A portfolio with this name already exists" }
  }

  const newPortfolio = await prisma.portfolio.create({
    data: {
      name,
      slug: formattedSlug,
    },
  })
  console.log("Buy Transaction Saved: ", newPortfolio)

  revalidatePath("/")
  redirect(`/portfolio/${newPortfolio.slug}`)
}
