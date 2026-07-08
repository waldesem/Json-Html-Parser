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
  <tr v-if="!props.field.key">
    <th colspan="2">{{ props.field.label }}</th>
  </tr>
  <tr v-else-if="data">
    <td>{{ props.field.label }}</td>
    <td v-bind="props.field.attr">{{ data }}</td>
  </tr>
</template>
