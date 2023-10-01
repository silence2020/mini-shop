import {defineStore} from 'pinia'
import {ref} from 'vue'
export const useMemberStore = defineStore(
    'member',
    () => {
        const profile = ref()

        const setProfile = (val: any) => {
            profile.value = val
        }

        const clearProfile = () => {
            profile.value = undefined
        }
        //return status和action
        return {
            profile,
            setProfile,
            clearProfile
        }
    },
    //持久化配置
    {
        //网页版配置
        //persist: true
        //小程序端配置
        persist: {
            storage: {
                getItem(key){
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                },
            }
        }
    }
)