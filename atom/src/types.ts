export interface task {
    title: string
    href: string
    type: "telegram"|"x"|"visit"|"youtube"|"discord"
    reward: number
    isPublish: boolean
    isDelete: boolean
}