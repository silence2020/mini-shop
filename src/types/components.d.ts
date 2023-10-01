import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxColorBlock from '@/components/XtxColorBlock.vue'
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        XtxSwiper: typeof XtxSwiper
        XtxColorBlock: typeof XtxColorBlock
    }
}

//声明组件实例类型
export type XtxColorBlockInstance = InstanceType<typeof XtxColorBlock>