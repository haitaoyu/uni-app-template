<!-- 示例页面 -->
<template>
  <view class="wrapper">
    <image src="../static/top_bg.png" mode="widthFix" class="top-bg"></image>
    <view class="content-wrapper">
      <view class="tips">请您仔细填写报名信息，感谢您的支持和参与！</view>
      <view style="margin-top: 40rpx">
        <view>
          <view class="info-title">
            <text class="star">*</text>
            <text>邀约码：</text>
          </view>
          <view style="margin-top: 16rpx">
            <up-input v-model.trim="inviteCode" :customStyle="inputStyle" placeholder="请输入邀约码" border="surround"></up-input>
          </view>
        </view>
        <view>
          <view class="info-title" style="margin-top: 40rpx">
            <text class="star">*</text>
            <text>姓名：</text>
          </view>
          <view style="margin-top: 16rpx">
            <up-input v-model.trim="name" :customStyle="inputStyle" placeholder="请输入姓名" border="surround"></up-input>
          </view>
        </view>
        <view style="margin-top: 40rpx">
          <view class="info-title">
            <text class="star">*</text>
            <text>身份证号：</text>
            <view style="margin-top: 16rpx">
              <up-input v-model.trim="idNum" :customStyle="inputStyle" placeholder="请输入身份证号" border="surround" type="idcard" maxlength="18"></up-input>
            </view>
          </view>
        </view>
        <view style="margin-top: 40rpx">
          <view class="info-title">
            <text class="star">*</text>
            <text>手机号：</text>
          </view>
          <view style="margin-top: 16rpx; display: flex; align-items: center">
            <up-input v-model="phone" :customStyle="inputStyle" placeholder="请点击微信授权" border="surround" :readonly="true"></up-input>
            <up-button open-type="getPhoneNumber" type="primary" :plain="true" text="微信授权" size="normal" :customStyle="{ backgroundColor: '#023D8E', color: '#FFF', width: '160rpx', height: '76rpx', borderRadius: '46rpx', marginLeft: '10rpx' }" @getphonenumber="getPhoneNumber"></up-button>
          </view>
        </view>
        <view class="read-wrapper">
          <up-checkbox v-model:checked="agreed" usedAlone activeColor="#023d8e" size="38rpx"></up-checkbox>
          <view>我已阅读并同意<text style="color: darkblue" @click="navToTips">《报名须知》</text>和<text style="color: darkblue" @click="navToPolicy">《隐私协议》</text> </view>
        </view>
        <view style="margin-top: 50rpx">
          <up-button :loading="loading" throttleTime="300" type="primary" text="提 交 信 息" color="linear-gradient(to right, #C98618, #F2BD61)" :customStyle="{ borderRadius: '16px', fontWeight: 'bold', color: '#292E84', width: '68%' }" @click="submit"></up-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { isIdNum } from '@/common/utils'
import { getLoginInfo, submitInviteInfo } from '../api'

const inputStyle = {
  borderRadius: '46px',
  backgroundColor: '#EBE9EA',
  height: '76rpx',
  fontSize: '24rpx'
}
const inviteCode = ref('')
const name = ref('')
const idNum = ref('')
const phone = ref('')
const agreed = ref(false)
const loading = ref(false)

const getPhoneNumber = (e) => {
  if (e.detail.code) {
    getLoginInfo({ code: e.detail.code })
      .then((res) => {
        uni.setStorageSync('token', res.token)
        uni.setStorageSync('phone', res.phone)
        phone.value = res.phone
      })
      .catch((err) => {})
  }
}
const navToTips = () => {
  uni.navigateTo({ url: '' })
}
const navToPolicy = () => {
  uni.navigateTo({ url: '' })
}

const submit = () => {
  if (!inviteCode.value.trim()) {
    uni.showToast({ title: '邀约码不能为空', duration: 1500, icon: 'none' })
    return
  }
  if (inviteCode.value.trim().length < 4) {
    uni.showToast({ title: '邀约码长度不能少于 4 位', duration: 1500, icon: 'none' })
    return
  }
  if (inviteCode.value.trim().length > 10) {
    uni.showToast({ title: '邀约码长度不能超过 10 位', duration: 1500, icon: 'none' })
    return
  }
  if (!name.value.trim()) {
    uni.showToast({ title: '姓名不能为空', duration: 1500, icon: 'none' })
    return
  }
  if (name.value.trim().length < 2) {
    uni.showToast({ title: '姓名至少填写 2 个字', duration: 1500, icon: 'none' })
    return
  }
  if (!idNum.value.trim()) {
    uni.showToast({ title: '身份证号不能为空', duration: 1500, icon: 'none' })
    return
  }
  if (!isIdNum(idNum.value)) {
    uni.showToast({ title: '身份证号不正确', duration: 1500, icon: 'none' })
    return
  }
  if (!phone.value.trim()) {
    uni.showToast({ title: '请点击微信授权', duration: 1500, icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请勾选已阅读并同意报名须知和隐私协议', duration: 1500, icon: 'none' })
    return
  }
  uni.showLoading({ title: '正在努力预约中' })
  loading.value = true
  submitInviteInfo({
    code: inviteCode.value,
    name: name.value,
    idCard: idNum.value
  })
    .then(() => {
      uni.hideLoading()
      loading.value = false
    })
    .catch((err) => {
      uni.hideLoading()
      loading.value = false
      uni.showToast({ title: err.message, icon: 'none', duration: 3000 })
    })
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #37668a;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 60rpx;
  .top-bg {
    display: block;
    width: 100vw;
  }
  .content-wrapper {
    width: 94vw;
    margin: -20rpx auto 0 auto;
    background-color: #ffffff;
    border-radius: 32rpx;
    padding: 40rpx 56rpx 80rpx 56rpx;
    z-index: 2;
    .tips {
      font-size: 26rpx;
      line-height: 44rpx;
    }
    .info-title {
      font-size: 28rpx;
      .star {
        color: #ff0000;
        margin-right: 8rpx;
      }
    }
    .read-wrapper {
      margin-top: 30rpx;
      font-size: 26rpx;
      display: flex;
      align-items: center;
    }
  }
}
</style>
