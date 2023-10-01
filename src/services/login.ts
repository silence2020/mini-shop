import type { UserInfo } from "@/types/user";
import { http } from "@/utils/http";
type LoginParam = {
    code: string
    encryptedData: string
    iv: string
}

/**
 * 小程序登录
 * @param option 
 */
export const loginWeiXinAPI = (option: LoginParam) => {
    http({
        method: 'POST',
        url: '/login/wxMin',
        data: option,
    })
}

export const simpleLoginWeiXinAPI = (phonenumber: string) => {
    return new Promise<UserInfo>((resolve, reject) => {
        const res = {
            token: 'U_5t.ug$ji!efj@ge4h83t#ehfwe834t843gij-ergheur&hg734th5thu45hg374t7h34hfguwngh*5hgsehf7234yr8423ti34htgi3hg4j20ir*&6.',
            accout: '15233452375',
            id: 'WX_0808',
            nickname: 'zyb_2023',
            mobile: '15233452375'
        }
        resolve(res)
    })
}