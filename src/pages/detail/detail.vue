<script setup lang="ts">
type ColorItem = { content: string, color: string }
//在ColorItem的基础上扩展一个非必填的属性
type ColorItemEx = ColorItem & { id?: string }
//defineProps<{ content: string, color: string }>()
const param = defineProps<ColorItem>()
//动态设置标题和背景色
uni.setNavigationBarTitle({ title: param.content })
uni.setNavigationBarColor({
  frontColor: '#000000',
  backgroundColor: '#ffffff'
})
</script>

<template>
  <view class="view-item" :style="{ backgroundColor: color }">{{ content }}</view>
</template>

<style scoped>
.view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>