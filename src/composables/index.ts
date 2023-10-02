import type { XtxColorBlockInstance } from "@/types/components"
import { ref } from "vue"

//色块的组合式函数
export const useColorBlock = () => {
    //获取组件实例
    const colorBlock = ref<XtxColorBlockInstance>()
    //滚动触底函数
    const onScrolltolower = () => {
        colorBlock.value?.getMore()
    }

    //返回组件实例和滚动触底函数
    return {
        colorBlock,
        onScrolltolower
    }
}