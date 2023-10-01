<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { loginWeiXinAPI, simpleLoginWeiXinAPI } from "@/services/login";
import { userInfoStore } from "@/stores/modules/userinfo";
//动态设置标题和背景色
uni.setNavigationBarTitle({ title: 'login' })
uni.setNavigationBarColor({
  frontColor: '#000000',
  backgroundColor: '#ffffff'
})
let code = ''
onLoad(async () => {
  //获取登录凭证
  const res = await wx.login()
  code = res.code
})

//获取用户手机号码（企业中写法，个人开发者没有权限解密手机号）
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  //!空值断言
  const encryptedData = ev.detail!.encryptedData!
  const iv = ev.detail.iv!
  const res = await loginWeiXinAPI({
    code: code,
    encryptedData: encryptedData,
    iv: iv
  })
  console.log(res)
}

const userStore = userInfoStore()
//开发测试写法
const simpleLogin = async () => {
  const userInfo = await simpleLoginWeiXinAPI('15233452375')
  uni.showToast({ title: '登录成功', icon: 'success' })
  userStore.setUserInfo(userInfo)
  setTimeout(() => {
    uni.switchTab({ url: '/pages/my/my' })
  }, 500)

}


</script>

<template>
  <!-- <view class="view-item" :style="{ backgroundColor: color }">{{ content }}</view> -->
  <view>
    <button open-type="getPhoneNumber" @getphonenumber="onGetphonenumber" type="primary">获取手机号</button>
    <button @tap="simpleLogin" type="primary">模拟登录</button>
  </view>
</template>

<style scoped></style>