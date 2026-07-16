<script setup lang="ts">
import { useTemplateRef } from 'vue'
import GitHub from './GitHub.vue'

const emit = defineEmits(['handle'])

// Получаем ссылку на input для выбора файла
const input = useTemplateRef('input')

async function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const str = (await files[0]?.text()) as string
    emit('handle', str)
  }
}
</script>

<template>
  <div class="container absolute-center background-font">
    <!-- GitHub link -->
    <div class="fixed-top-end" title="GitHub">
      <a href="https://github.com/waldesem/Json-Html-Parser" target="_blank">
        <GitHub />
      </a>
    </div>
    <!-- Главная страница -->
    <div class="heading">{ JSON } TO HTML</div>
    <input ref="input" class="hidden" type="file" @change="onFileChange" />
    <button type="button" class="btn font-bold" @click="input?.click()">
      Выберите файл
    </button>
  </div>
</template>
