<script setup lang="ts">
import { ref } from "vue";
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
let value = ref("ok");
const iconClick = () => { }
</script>

<template>
    <view class="seach" :style="{paddingTop: safeAreaInsets?.top + 'px'}">
        <uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="value" placeholder="右侧图标"
            @iconClick="iconClick"></uni-easyinput>
    </view>
</template>

<style>
.seach {
    padding-top: 20px;
    padding-bottom: 20px; 
    margin-left: auto;
    margin-right: auto;
    height: 80rpx;
    background-color: red;
}
</style>