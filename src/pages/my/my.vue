<script setup lang="ts">
import { userInfoStore } from "@/stores/modules/userinfo";
const userStore = userInfoStore()
</script>

<template>
  <view class="view-item">
    <view>
      <image class="view-image" :src="userStore.userInfo?.avatar" mode="aspectFit" />
      <text class="view-text">{{ userStore.userInfo?.nickname || userStore.userInfo?.accout }}</text>
      <view class="view-setting" v-if="userStore.userInfo">
        <navigator url="/subpackage/setting/setting">
          <text>设置</text>
        </navigator>
      </view>
    </view>
  </view>
  <navigator url="/pages/test/test">
    <button style="color:#ffffff;backgroundColor:#d08a3a;borderColor:#d08a3a" type="default">
      测试SKU
    </button>
  </navigator>
</template>

<style scoped>
.view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
  width: 100%;
  background-color: rgb(199, 15, 144);
}

.view-image {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  width: 100rpx;
  margin-top: 140rpx;
  margin-left: 80rpx;
  float: left;
}

.view-text {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  width: 100rpx;
  margin-top: 140rpx;
  margin-left: 20rpx;
  float: left;
  color: aliceblue;
}

.view-setting {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  width: 100rpx;
  margin-top: 140rpx;
  margin-left: 260rpx;
  float: left;
  color: aliceblue;
}
</style>