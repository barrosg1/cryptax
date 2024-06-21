import { gravatars } from "@/data"

export const isEmpty = <T>(value: T): boolean =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0)

export const getRandomAvatar = (): string => {
  return gravatars[Math.floor(Math.random() * gravatars.length)]
}

export const convertSlug = (slug: string): string => {
  return slug
    .replace(/(?<=\S)\s+(?=\S)/g, "-")
    .toLowerCase()
    .trim()
}

export const delay = async (number: number) => {
  await new Promise((resolve) => setTimeout(resolve, number))
}

export const isNegative = (number: number) => {
  return Math.sign(number) === -1
}
