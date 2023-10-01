import type { UserInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const userInfoStore = defineStore(
    'userinfo',
    () => {
        const userInfo = ref<UserInfo>()
        const setUserInfo = (val: any) => { userInfo.value = val }
        const clearUserInfo = () => { userInfo.value = undefined }
        return {
            userInfo,
            setUserInfo,
            clearUserInfo
        }
    },
    {
        persist: {
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                },
            }
        }
    }
)