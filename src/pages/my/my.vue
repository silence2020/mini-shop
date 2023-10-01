<script setup lang="ts">
import Vue from 'vue';
import { useMemberStore } from '@/stores/modules/member'
import { http } from '@/utils/http'
import { onMounted } from 'vue';
import { getRandomItem } from "@/services/home";
import { ref } from 'vue';
import type { BannerItem } from '@/types/home';
const memberStore = useMemberStore()

const getData = async () => {
  const res = await http<number[]>({
    method: 'GET',
    url: '/home/banner',
    header: {}
  })
  console.log('请求成功：' + res.result)
}

const info = ref<BannerItem[]>([])




</script>

<template>
  <div class="my">my</div>
  <text>{{ memberStore.profile }}</text>
  <button type="primary" plain @tap="memberStore.setProfile('我的配置')">按钮</button>
  <button type="primary" plain @tap="getData">请求数据</button>
  <view style="width: 100%; overflow: auto;">
    <XtxColorBlock />
  </view>
</template>

<style scoped></style>