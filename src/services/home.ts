import type { BannerItem, PageInfo, PageParam } from "@/types/home"

interface ResData<T> {
    code: string
    msg: string
    result: T
}
export const getBannerItemAPI = () => {

    return new Promise<ResData<BannerItem[]>>((resolve, reject) => {
        const info: BannerItem[] = [{
            content: '内容 A',
            color: 'azure'
        }, {
            content: '内容 B',
            color: 'cornsilk'
        }, {
            content: '内容 C',
            color: 'bisque'
        }, {
            content: '内容 D',
            color: 'bisque'
        }]
        const data: ResData<BannerItem[]> = {
            code: '200',
            msg: 'ok',
            result: info
        }
        resolve(data as ResData<BannerItem[]>)
    })
}


const mateData: BannerItem[] = []
//获取随机字符串
function getRandomStr() {
    return Math.random().toString(36).slice(2, 10).padEnd(8, 'X').toUpperCase()
}
//获取随机颜色
function getRandomColor() {
    //产生的随机值转为16进制，截取小数点后6位，不足6位末尾补零
    return '#' + Math.random().toString(16).slice(2, 8).padEnd(6, '0')
}

function addMateData(count: number) {
    for (let i = 0; i < count; i++) {
        mateData.push({ content: i + '_' + getRandomStr(), color: getRandomColor() })
    }
}

export const getRandomItem = (param: PageParam) => {
    //初始化数据
    if (mateData.length === 0) {
        addMateData(43)
    }
    return new Promise<PageInfo<BannerItem>>((resolve, reject) => {
        const start = (param.index - 1) * param.pageSize
        const end = start + param.pageSize
        const pagedata = {
            index: param.index,
            //每页条数
            pageSize: param.pageSize,
            //总条数
            total: mateData.length,
            //总页数
            pages: Math.ceil(mateData.length / param.pageSize),
            //数据 slice(start, end)左闭右开
            items: mateData.slice(start, end)
        }
        resolve(pagedata)
    })
}
