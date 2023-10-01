<script setup lang="ts">
import type {BannerItem} from "@/types/home";
let current: 0
defineProps<{list:BannerItem[]}>()
</script>
<template>
    <uni-swiper-dot :info="list" :current="current" field="content" mode="default">
        <swiper class="swiper-box">
            <swiper-item v-for="(item, index) in list" :key="index">
                <view class="view-height" :style="{ backgroundColor: item.color }">
                    {{ item.content }}
                </view>
            </swiper-item>
        </swiper>
    </uni-swiper-dot>
</template>
<style>
.view-height {
    height: 100%
}

.swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
}
</style>