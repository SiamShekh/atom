export interface task {
    _id: string
    title: string
    href: string
    type: "telegram"|"x"|"visit"|"youtube"|"discord"
    reward: number
    isPublish: boolean
    isDelete: boolean
    createdAt: string
  updatedAt: string
  __v: number
}