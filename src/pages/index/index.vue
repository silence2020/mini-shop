<template>
  <Navbar />
  <scroll-view refresher-enabled @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower" scroll-y class="scroll-Y">
    <Skeleton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <XtxColorBlock ref="colorBlock" />
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import Navbar from "@/pages/index/components/Navbar.vue";
import { getBannerItemAPI } from "@/services/home";
import type { XtxColorBlockInstance } from "@/types/components";
import type { BannerItem } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Skeleton from "@/pages/index/components/Skeleton.vue";

const bannerList = ref<BannerItem[]>([])
//定义开关
const isLoading = ref(true)
onLoad(async () => {
  //isLoading
  isLoading.value = true
  const res = await getBannerItemAPI()
  bannerList.value = res.result
  //is not Loading
  isLoading.value = false
})

const colorBlock = ref<XtxColorBlockInstance>()
const onScrolltolower = () => {
  colorBlock.value?.getMore()
}

const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  //开启下拉动画
  isTriggered.value = true
  //等待多个业务方法执行完成
  await Promise.all([
    getBannerItemAPI(),
    onScrolltolower()
  ])
  //关闭下拉动画
  isTriggered.value = false
}
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-Y {
  height: 0px;
  flex: 1;
}

.view-item {
  height: 400rpx;
  line-height: 400rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>
