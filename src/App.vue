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
  <div class="fluid">
    <!-- Содержимое: данные из файла -->
    <div v-if="datas" class="grid-display">
      <template v-for="fields of schema">
        <!--Если есть поле со списком ключей -->
        <div v-if="fields.keys" :class="fields.attr">
          {{ fields.keys.map((key) => datas?.[key as keyof Data]).join(' ') }}
        </div>

        <!-- Если есть поле items с дочерними полями -->
        <template v-else-if="fields.items">
          <!--Если есть непустой список с данными -->
          <div v-if="datas[fields.key as keyof Conditions].length">
            <div class="text-underline font-semibold">
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
        class="button-outline position-fixed-bottom-end no-print"
        style="z-index: 1050"
        type="button"
        @click="print()"
      >
        Печать
      </button>
    </div>

    <!-- Стартовая страница: анимация и кнопка выбора файла -->
    <div v-else class="position-absolute-center">
      <div
        :class="{ 'no-animation': !isAnimated }"
        class="flashlight font-color-primary heading"
      >
        JSON TO HTML
      </div>
      <input
        ref="fileInput"
        type="file"
        @change="handleFileChange"
        class="hidden"
      />
      <button
        @mouseover="isAnimated = false"
        type="button"
        class="button-outline"
        @click="triggerFileInput()"
      >
        Выберите файл
      </button>
    </div>
  </div>
</template>
