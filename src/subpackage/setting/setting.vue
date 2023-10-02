<script setup lang="ts">
import { userInfoStore } from "@/stores/modules/userinfo";
const userStore = userInfoStore()
const logOut = () => {
  uni.showModal({
    content: '是否确认退出登录？',
    success: (res) => {
      if (res.confirm) {
        //清理用户信息
        userStore.clearUserInfo()
        //返回上一页
        uni.navigateBack()
      }
    },
  })
}
</script>

<template>
  <view class="view-item">
    <text>设置</text>
  </view>
  <navigator url="/subpackage/myinfo/myinfo">
    <button style="color:#ffffff;backgroundColor:#d08a3a;borderColor:#d08a3a" type="default">
      个人信息
    </button>
  </navigator>
  <button type="default" @tap="logOut">退出登录</button>
</template>



<style scoped>
.view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 60rpx;
  width: 100%;
  color: aliceblue;
  background-color: rgb(50, 176, 248);
}
</style>