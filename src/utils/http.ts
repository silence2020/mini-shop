import { useMemberStore } from '@/stores/modules/member'
const baseUrl = "https://www.example.com"
//定义一个拦截器
const interceptor = {
    //invoke拦截前触发
    invoke(option: UniApp.RequestOptions) {
        if (!option.url.startsWith('http')) {
            option.url = baseUrl + option.url
        }
        option.timeout = 10000
        option.header = {
            ...option.header,
            source: 'weixin-app',
        }
        const memberStore = useMemberStore()
        const token = memberStore.profile?.token
        if (token) {
            option.header.Authorization = token
        }
    },
}
//给uni.request()和uni.uploadFile()设置拦截器
uni.addInterceptor("request", interceptor)
uni.addInterceptor("uploadFile", interceptor)

//ts支持泛型
interface ResData<T> {
    code: string
    msg: string
    result: T
}
//导出http
export const http = <T>(option: UniApp.RequestOptions) => {
    return new Promise<ResData<T>>((resolve, reject) => {
        uni.request({
            ...option,
            //成功回调
            success(res) {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    //提取数据标记成功
                    resolve(res.data as ResData<T>)
                } else if (res.statusCode === 401) {
                    const memberStore = useMemberStore()
                    memberStore.clearProfile()
                    //跳转登录页，标记失败
                    uni.navigateTo({ url: '/pages/login/login' })
                    reject(res)
                } else {
                    uni.showToast({
                        title: (res.data as ResData<T>).msg || '请求错误',
                        icon: 'none'
                    })
                    reject(res)
                }
            },
            //失败回调
            fail(err) {
                uni.showToast({
                    title: '网络错误',
                    icon: 'none'
                })
                reject(err)
            }
        })
    })
}