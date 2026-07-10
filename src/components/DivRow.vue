<script setup lang="ts">
import type { Schemas, Items } from '@/types'

const props = defineProps<{
  value: string | undefined
  field: Schemas | Items
}>()

const formatter = props.field.foo ?? ((v: string) => v)
const row: string = props.value ? formatter(props.value) : ''
const data = props.field.foo ? props.value : row
</script>

<template>
  <!-- Если поле не имеет ключа -->
  <div v-if="!props.field.key" class="row">
    <div class="col fw-semibold">{{ props.field.label }}</div>
  </div>
  <!-- Если поле имеет ключ -->
  <div v-else-if="data" class="row">
    <div :class="[props.field.attr ?? '', 'col-4']">
      {{ props.field.label }}
    </div>
    <div class="col-8">{{ data }}</div>
  </div>
</template>
