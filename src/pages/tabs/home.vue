<template>
  <view class="wrapper">
    <view class="btn-box">
      <view style="display: flex; justify-content: center; margin-top: 20rpx">
        <view class="btn-item" @click="navTo('/pages/home/reserve/index')">
          <view style="display: flex; justify-content: center">
            <image src="/static/imgs/reserve.png" class="image-style"></image>
          </view>
        </view>
        <view class="btn-item">
          <view style="display: flex; justify-content: center">
            <image src="/static/imgs/tips.png" class="image-style"></image>
          </view>
        </view>
        <view class="btn-item">
          <view style="display: flex; justify-content: center">
            <image src="/static/imgs/result.png" class="image-style"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'

onShareAppMessage(() => {
  return {
    title: '分享给朋友',
    path: '/pages/tabs/home'
  }
})

onShareTimeline(() => {
  return {
    title: '分享到朋友圈',
    path: '/pages/tabs/home'
  }
})

const navTo = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  .btn-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    height: 200rpx;
    padding-bottom: 10rpx;
    background-color: $bgc;
    .btn-item {
      width: 120rpx;
      height: 120rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #e9eeee;
      margin: 15rpx;
      justify-content: center;
      color: #0411a6;
    }
  }
  .image-style {
    width: 130rpx;
    height: 130rpx;
  }
}
</style>
