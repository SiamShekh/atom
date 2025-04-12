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

export interface user {
  _id: string
  name: string
  username: string
  uid: number
  balance: number
  referCode: string
  spinCredit: number
  adsWatched: number
  referCount: number
  lastSeen: string
  createdAt: string
  updatedAt: string
  __v: number
}


export interface CompeletedTask {
  _id: string
  userId: string
  taskId: task
  point: number
  createdAt: string
  updatedAt: string
  __v: number
}