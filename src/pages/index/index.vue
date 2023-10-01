<template>
  <Navbar />
  <scroll-view @scrolltolower="onScrolltolower" scroll-y class="scroll-Y">
    <XtxSwiper :list="bannerList" />
    <XtxColorBlock ref="scroll" />
  </scroll-view>
</template>

<script setup lang="ts">
import Navbar from "@/pages/index/components/Navbar.vue";
import { getBannerItemAPI } from "@/services/home";
import type { XtxColorBlockInstance } from "@/types/components";
import type { BannerItem } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";

import { ref } from "vue";

const bannerList = ref<BannerItem[]>([])
onLoad(async () => {
  const res = await getBannerItemAPI()
  bannerList.value = res.result

})

const scroll = ref<XtxColorBlockInstance>()
const onScrolltolower = () => {
  scroll.value?.getMore()
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
