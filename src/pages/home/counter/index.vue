<!-- Pinia 使用示例 -->
<template>
  <view>Current Count: {{ counter.count }}</view>
  <up-button text="add" @click="add"></up-button>
</template>
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

const add = () => {
  counter.increment()

  // 也可以使用以下两种方法
  // counter.count++
  // counter.$patch({ count: counter.count + 1 })
}
</script>
