export interface task {
  _id: string
  title: string
  href: string
  type: "telegram" | "x" | "visit" | "youtube" | "discord"
  reward: number
  isPublish: boolean
  isDelete: boolean
  isComplete?: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface setting {
  _id: string
  genarelUserInviteBonus: number
  premiumUserInviteBonus: number
  newAccountBonus: number
  referCommission: number
  createdAt: string
  updatedAt: string
  __v: number
}
