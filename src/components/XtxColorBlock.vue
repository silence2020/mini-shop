<script setup lang="ts">
import { onMounted } from 'vue';
import { getRandomItem } from "@/services/home";
import { ref } from 'vue';
import type { BannerItem, PageParam } from '@/types/home';

const info = ref<BannerItem[]>([])
let isFinish = false
const param: PageParam = {
    index: 1,
    pageSize: 10
}
//组件生命周期函数
onMounted(async () => {
    getItems()
})

//获取数据
const getItems = async () => {
    if (isFinish) {
        uni.showToast({
            title: '已经到底了~ 没有更多数据了~',
            icon: 'none'
        })
        return
    }
    const data = await getRandomItem(param)
    info.value.push(...data.items)
    if (param.index < data.pages) {
        param.index++
    } else {
        isFinish = true
    }

}

//向外暴露方法
defineExpose({
    getMore: getItems
})
</script>
<template>
    <view style="width: 100%; overflow: auto;">
        <view class="view-item" :style="{ backgroundColor: item.color }" v-for="(item, index) in info" :key="index">
            <navigator :url="`/pages/detail/detail?content=${item.content}&color=${item.color}`">
                {{ item.content }}
            </navigator>
        </view>
    </view>
</template>
<style scoped>
.view-item {
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
    font-size: 36rpx;
    width: 50%;
    float: left;
}
</style>