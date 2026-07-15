<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import GitHub from './GitHub.vue'

const emit = defineEmits(['handle'])

// Флаг анимации
const isAnimated = shallowRef(true)

// Получаем ссылку на input для выбора файла
const fileInput = useTemplateRef('fileInput')

// Функция-триггер input для выбора файла
function triggerFileInput() {
  fileInput.value?.click()
}

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
  <div class="flex-absolute-center background-font">
    <div
      :class="{ 'no-animation': !isAnimated }"
      class="flashlight text-color heading"
    >
      JSON TO HTML
    </div>
    <input ref="fileInput" class="hidden" type="file" @change="onFileChange" />
    <button
      @mouseover="isAnimated = false"
      type="button"
      class="font-bold"
      @click="triggerFileInput()"
    >
      Выберите файл
    </button>
    <div class="fixed-top-end" title="GitHub">
      <a href="https://github.com/waldesem/Json-Html-Parser" target="_blank">
        <GitHub />
      </a>
    </div>
  </div>
</template>
