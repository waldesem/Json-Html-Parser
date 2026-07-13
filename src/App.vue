<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { schema } from './schema'
import DivRow from './components/DivRow.vue'
import type { Conditions, Data } from './types'

// Данные из файла json
const datas = shallowRef<(Data & Conditions) | null>(null)

// Флаг анимации
const isAnimated = shallowRef(true)

// Получаем ссылку на input для выбора файла
const fileInput = useTemplateRef('fileInput')

// Функция-триггер input для выбора файла
function triggerFileInput() {
  if (fileInput.value) fileInput.value.click()
}

// Функция для обработки изменения файла
async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    const str = (await files[0]?.text()) as string
    datas.value = JSON.parse(str)
  }
}

const print = () => {
  window.print()
}
</script>

<template>
  <div class="container-fluid">
    <!-- Содержимое: данные из файла -->
    <div v-if="datas" class="d-grid gap-0 row-gap-2">
      <template v-for="fields of schema">
        <!--Если есть поле со списком ключей -->
        <div v-if="fields.keys" class="row mb-2">
          <div :class="['col', fields.attr]">
            {{ fields.keys.map((key) => datas?.[key as keyof Data]).join(' ') }}
          </div>
        </div>

        <!-- Если есть поле items с дочерними полями -->
        <template v-else-if="fields.items">
          <!--Если есть непустой список с данными -->
          <div
            v-if="datas[fields.key as keyof Conditions].length"
            class="row mt-2"
          >
            <div class="col text-decoration-underline fw-semibold">
              {{ fields.label }}
            </div>
          </div>

          <template v-for="data in datas[fields.key as keyof Conditions]">
            <template v-for="field in fields.items">
              <DivRow
                :value="data[field.key as keyof typeof data]"
                :field="field"
              />
            </template>
          </template>
        </template>

        <!-- Если нет дочерних полей -->
        <DivRow
          v-else
          :value="datas[fields.key as keyof Data]"
          :field="fields"
        />
      </template>

      <!-- Кнопка печати -->
      <button
        class="btn btn-outline-primary position-fixed bottom-0 end-0 m-4 d-print-none"
        style="z-index: 1050"
        type="button"
        @click="print()"
      >
        Печать
      </button>
    </div>

    <!-- Стартовая страница: анимация и кнопка выбора файла -->
    <div
      v-else
      class="position-absolute top-50 start-50 translate-middle row gy-4"
    >
      <p
        :class="{ 'no-animation': !isAnimated }"
        class="flashlight text-center text-primary-emphasis display-1"
      >
        JSON TO HTML
      </p>
      <input
        ref="fileInput"
        type="file"
        @change="handleFileChange"
        class="d-none"
      />
      <button
        @mouseover="isAnimated = false"
        type="button"
        class="btn btn-outline-primary"
        @click="triggerFileInput()"
      >
        Выбрать файл
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes move-circle {
  0% {
    clip-path: circle(15% at 10% 50%);
  }
  100% {
    clip-path: circle(15% at 90% 50%);
  }
}

.flashlight {
  animation: move-circle 3s 3 alternate cubic-bezier(0.46, 0.03, 0.52, 0.96);
}

.flashlight.no-animation {
  animation: none;
}
</style>
