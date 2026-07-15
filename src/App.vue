<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue'
import ToastDiv from './components/ToastDiv.vue'
import type { Conditions, Data } from './types'

const DataPage = defineAsyncComponent(() => import('./components/DataPage.vue'))
const MainPage = defineAsyncComponent(() => import('./components/MainPage.vue'))

// Данные файла json
const datas = shallowRef<(Data & Conditions) | null>(null)

// Ошибка парсинга json
const error = shallowRef<string | null>(null)

// Обработчик файла json
function handleFileContent(str: string) {
  try {
    datas.value = JSON.parse(str)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Ошибка парсинга JSON'
  }
}
</script>

<template>
  <Transition name="fade">
    <DataPage v-if="datas" :datas="datas" />
    <MainPage v-else @handle="handleFileContent" />
  </Transition>

  <ToastDiv v-model="error" />
</template>
