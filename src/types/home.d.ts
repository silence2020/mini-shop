export type BannerItem = {
    content: string
    color: string
}


export interface PageInfo<T> {
    //当前页数
    index: number
    //每页条数
    pageSize: number
    //总条数
    total: number
    //总页数
    pages: number

    //列表数据
    items: T[]
}

export type PageParam = {
    //当前页数
    index: number
    //每页条数
    pageSize: number
}