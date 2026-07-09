<script setup lang="ts">
import { shallowRef, useTemplateRef } from 'vue'
import { useAnimate, useFileDialog } from '@vueuse/core'
import { schema } from './schema'
import DivBlock from './components/DivBlock.vue'
import DivRow from './components/DivRow.vue'
import type { Conditions, Data } from './types'

const { open, onChange } = useFileDialog({
  accept: '*.json',
  multiple: false,
})

const data = shallowRef<(Data & Conditions) | null>(null)

onChange(async (files) => {
  if (files) {
    const str = (await files[0]?.text()) as string
    data.value = JSON.parse(str)
  }
})

const el = useTemplateRef('el')

useAnimate(
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
</script>

<template>
  <div class="container-fluid">
    <button type="button" class="btn btn-outline-primary" @click="open()">Выбрать файл</button>
    <Transition>
      <div v-if="data" class="d-grid gap-0 row-gap-2">
        <div class="row">
          <div class="col fw-semibold">
            {{ `${data.positionName} ${data.department}` }}
          </div>
        </div>
        <div class="row border-bottom">
          <div class="col fw-bold">
            {{ `${data.lastName} ${data.firstName} ${data.midName ?? ''}`.toUpperCase() }}
          </div>
        </div>
        <template v-for="field of schema">
          <DivBlock
            v-if="field.items"
            :datas="data[field.key as keyof Conditions]"
            :fields="field.items"
            :label="field.label"
          />
          <DivRow v-else :value="data[field.key as keyof Data]" :field="field" />
        </template>
      </div>
      <div v-else class="position-absolute top-50 start-50 translate-middle row gy-4">
        <p ref="el" class="text-center text-primary-emphasis display-1">JSON TO HTML</p>
        <button type="button" class="btn btn-outline-primary" @click="open()">Выбрать файл</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
