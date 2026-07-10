<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { useAnimate, useFileDialog } from '@vueuse/core'
import { schema } from './schema'
import DivRow from './components/DivRow.vue'
import type { Conditions, Data } from './types'

// Открытие диалога выбора файла
const { open, onChange } = useFileDialog({
  accept: '*.json',
  multiple: false,
})

// Данные из файла json
const datas = shallowRef<(Data & Conditions) | null>(null)

// Обработка загруженного файла
onChange(async (files) => {
  if (files) {
    const str = (await files[0]?.text()) as string
    datas.value = JSON.parse(str)
  }
})

// Получаем ссылку на элемент для анимации
const el = useTemplateRef('el')

// Анимация для элемента стартовой страницы
const { finish } = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' },
  ],
  {
    duration: 3000,
    iterations: 3,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
  },
)

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
        class="btn btn-outline-dark position-fixed bottom-0 end-0 m-4 d-print-none"
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
      <p ref="el" class="text-center text-primary-emphasis display-1">
        JSON TO HTML
      </p>
      <button
        @mouseover="finish"
        type="button"
        class="btn btn-outline-primary"
        @click="open()"
      >
        Выбрать файл
      </button>
    </div>
  </div>
</template>
