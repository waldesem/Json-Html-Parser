<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from 'vue'
import ToastDiv from './components/ToastDiv.vue'
import type { Conditions, Data } from './types'

const DataPage = defineAsyncComponent(() => import('./components/DataPage.vue'))
const MainPage = defineAsyncComponent(() => import('./components/MainPage.vue'))

// Данные файла json
const datas = shallowRef<(Data & Conditions) | null>(null)

// Статус парсинга json
const message = shallowRef<string | null>(null)
const status = shallowRef<'error' | 'success'>('success')

// Обработчик файла json
function handleFileContent(str: string) {
  try {
    datas.value = JSON.parse(str)
    message.value = 'Файл успешно загружен'
    status.value = 'success'
  } catch (e) {
    message.value = e instanceof Error ? e.message : 'Ошибка парсинга JSON'
    status.value = 'error'
  }
}
</script>

<template>
  <DataPage v-if="datas" :datas="datas" />
  <MainPage v-else @handle="handleFileContent" />

  <ToastDiv v-model="message" :status="status" />
</template>
