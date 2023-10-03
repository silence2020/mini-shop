<script setup lang="ts">
import { userInfoStore } from "@/stores/modules/userinfo";
import { ref } from "vue";
const userStore = userInfoStore()
type UserInfo = {
  name: string
  age: number
  sex: number
  hobby: number[]
  introduction: string
  datetimesingle: string
  city: string
}
const sexs = [{ text: '男', value: 0 }, { text: '女', value: 1 }, { text: '未知', value: 2 }]
const hobbys = [{ text: '足球', value: 0 }, { text: '篮球', value: 1 }, { text: '游泳', value: 2 }]
const candidates = ['北京', '南京', '东京', '武汉', '天津', '上海', '海口']
// 有初始值
// const formData = ref<UserInfo>({
//   name: 'zyb',
//   age: 25,
//   sex: 0,
//   hobby: [1, 2],
//   introduction: 'cccc',
//   datetimesingle: '2023-10-02',
//   city: '南京',
// })
// 没有初始值
const formData = ref({} as UserInfo)

const submit = () => {
  //调用保存接口
  uni.navigateBack()
}
const imageUrl = ref<string>(userStore.userInfo!.avatar!)
const onAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      //微信临时文件，刷新页面会清除（没有接口持久化保存图片）
      const { tempFilePath } = res.tempFiles[0]
      
      uni.uploadFile({
        url: '/user/profile/avatar',
        name: 'file',
        filePath: tempFilePath,
        success: (res) => {
          if (res.statusCode === 200) {
            imageUrl.value = JSON.parse(res.data).avatar
            //更新userStore，个人不建议这样修改；所有关于状态管理的修改都应该定义在Store内部的action中，组件调用action进行修改
            userStore.userInfo!.avatar = JSON.parse(res.data).avatar
            uni.showToast({ title: '头像更新成功', icon: 'none' })
          } else {
            //没有持久化接口先用临时文件做测试
            imageUrl.value = tempFilePath
            uni.showToast({ title: '头像更新失败', icon: 'none' })
          }
        },
      })
    },
  })
}
</script>

<template>
  <view class="view-item">
    <view @tap="onAvatar">
      <image class="view-image" :src="imageUrl" mode="aspectFit" />
      <text class="view-text">{{ userStore.userInfo?.nickname || userStore.userInfo?.accout }}</text>
    </view>
  </view>
  <view>
    <uni-section title="基本信息" type="line">
      <view>
        <!-- 基础用法，不包含校验规则 -->
        <uni-forms ref="baseForm" :modelValue="formData">
          <uni-forms-item label="姓名" required>
            <uni-easyinput v-model="formData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="年龄" required>
            <uni-number-box v-model="formData.age" />
          </uni-forms-item>
          <uni-forms-item label="性别" required>
            <uni-data-checkbox v-model="formData.sex" :localdata="sexs" />
          </uni-forms-item>
          <uni-forms-item label="兴趣爱好" required>
            <uni-data-checkbox v-model="formData.hobby" multiple :localdata="hobbys" />
          </uni-forms-item>
          <uni-forms-item label="自我介绍">
            <uni-easyinput type="textarea" v-model="formData.introduction" placeholder="请输入自我介绍" />
          </uni-forms-item>
          <uni-forms-item label="日期时间">
            <uni-datetime-picker type="datetime" return-type="timestamp" v-model="formData.datetimesingle" />
          </uni-forms-item>
          <uni-forms-item label="城市" required>
            <uni-combox :candidates="candidates" placeholder="请选择所在城市" v-model="formData.city"></uni-combox>
          </uni-forms-item>
        </uni-forms>
        <button type="primary" @click="submit">提交</button>
      </view>
    </uni-section>
  </view>
</template>

<style scoped>
.view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
  width: 100%;
  background-color: #d08a3a
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
</style>