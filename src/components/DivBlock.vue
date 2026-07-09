<script setup lang="ts">
import DivRow from './DivRow.vue'
import type { Expirience, Education, Names, Organizations, Items } from '@/types'

const props = defineProps<{
  datas: Expirience[] | Education[] | Names[] | Organizations[]
  fields: Items[]
  label: string | undefined
}>()
</script>

<template>
  <div v-if="datas.length" class="row mt-2">
    <div class="col fw-semibold">{{ props.label }}</div>
  </div>
  <div v-for="data in datas" class="d-grid gap-0 row-gap-2">
    <template v-for="field in props.fields">
      <DivRow :value="data[field.key as keyof typeof data]" :field="field" />
    </template>
  </div>
</template>
