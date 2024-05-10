import { gravatars } from "@/data"

export const getRandomAvatar = () => {
  return gravatars[Math.floor(Math.random() * gravatars.length)]
}
