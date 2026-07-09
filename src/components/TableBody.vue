<script setup lang="ts">
import TableRow from './TableRow.vue'
import type { Expirience, Education, Names, Organizations, Items } from '@/types'

const props = defineProps<{
  datas: Expirience[] | Education[] | Names[] | Organizations[]
  fields: Items[]
  label: string | undefined
}>()
</script>

<template>
  <tr v-if="datas.length">
    <th colspan="2">{{ props.label }}</th>
  </tr>
  <template v-for="data in datas">
    <template v-for="field in props.fields">
      <TableRow :value="data[field.key as keyof typeof data]" :field="field" />
    </template>
  </template>
</template>
