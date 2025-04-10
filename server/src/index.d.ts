declare namespace Express {
    export interface Request {
        user: {
            _id: string
            uid: number
            iat: number
        } | string | JwtPayload | undefined
    }
}