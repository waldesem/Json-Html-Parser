<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue'
import type { Conditions, Data } from './types'

const DataPage = defineAsyncComponent(() => import('./components/DataPage.vue'))
const MainPage = defineAsyncComponent(() => import('./components/MainPage.vue'))

// Данные файла json
const datas = shallowRef<(Data & Conditions) | null>(null)

// Обработчик файла json
const handleFileContent = (str: string) => {
  try {
    datas.value = JSON.parse(str)
  } catch (e) {
    alert(e)
  }
}
</script>

<template>
  <DataPage v-if="datas" :datas="datas" />
  <MainPage v-else :fileChange="handleFileContent" />
</template>
