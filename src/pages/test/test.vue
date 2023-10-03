<!-- 静态数据演示版本 适合任何后端 -->
<template>
  <view class="app">
    <button @click="openSkuPopup()">打开SKU组件</button>
    <vk-data-goods-sku-popup ref="skuPopup" v-model="skuKey" border-radius="20" :localdata="goodsInfo" :mode="skuMode"
      @open="onOpenSkuPopup" @close="SkuPopup" @add-cart="addCart" @buy-now="buyNow"></vk-data-goods-sku-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const goodsInfo = {
  "_id": "002",
  "name": "迪奥香水",
  "goods_thumb": "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
  "sku_list": [
    {
      "_id": "004",
      "goods_id": "002",
      "goods_name": "迪奥香水",
      "image": "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
      "price": 19800,
      "sku_name_arr": ["50ml/瓶"],
      "stock": 100
    },
    {
      "_id": "005",
      "goods_id": "002",
      "goods_name": "迪奥香水",
      "image": "https://res.lancome.com.cn/resources/2020/9/11/15998112890781924_920X920.jpg?version=20200917220352530",
      "price": 9800,
      "sku_name_arr": ["70ml/瓶"],
      "stock": 100
    }
  ],
  "spec_list": [
    {
      "list": [
        {
          "name": "20ml/瓶"
        },
        {
          "name": "50ml/瓶"
        },
        {
          "name": "70ml/瓶"
        }
      ],
      "name": "规格"
    }
  ]
}
let skuKey = ref<boolean>(true);
const skuMode = 1
const openSkuPopup = () => {
  skuKey.value = true
}
// sku组件 开始-----------------------------------------------------------
const onOpenSkuPopup = () => {
  console.log("监听 - 打开sku组件");
  skuKey.value = true
}
const SkuPopup = () => {
  console.log("监听 - 关闭sku组件");
  skuKey.value = false
}
const addCart = (selectShop) => {
  console.log("监听 - 加入购物车");
  addCartFn({
    selectShop: selectShop,
    success: function (res) {
      // 实际业务时,请替换自己的加入购物车逻辑
      toast(res.msg);
      setTimeout(function () {
        skuKey.value = false;
      }, 300);
    }
  });
}
const buyNow = (selectShop) => {
  console.log("监听 - 立即购买");
  addCartFn({
    selectShop: selectShop,
    success: function (res) {
      // 实际业务时,请替换自己的立即购买逻辑
      toast("立即购买");
    }
  });
}

// 加入购物车前的判断
const addCartFn = (obj) => {
  let { selectShop } = obj;
  // 模拟添加到购物车,请替换成你自己的添加到购物车逻辑
  let res = { msg: '' };
  let name = selectShop.goods_name;
  if (selectShop.sku_name != "默认") {
    name += "-" + selectShop.sku_name_arr;
  }
  res.msg = `${name} 已添加到购物车`;
  if (typeof obj.success == "function") obj.success(res);
}
const toast = (msg) => {
  uni.showToast({
    title: msg, icon: "none"
  })
}
</script>

<style lang="scss" scoped>
.app {
  margin-top: 300rpx;
  font-size: 28rpx;
}
</style>