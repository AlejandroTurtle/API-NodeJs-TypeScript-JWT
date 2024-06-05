import { Request } from "express"
import { Params } from "express-serve-static-core"

export const makemockRequest = ({params, querry}: {params?: Params, querry?: Params}):Request => {
    const request = {
        params: params || {},
        querry: querry || {}
    } as unknown
    return request as Request
} 