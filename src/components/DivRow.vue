<script setup lang="ts">
import type { Schemas, Items } from '@/types'

const props = defineProps<{
  value: string | undefined
  field: Schemas | Items
}>()
</script>

<template>
  <!-- Если поле не имеет ключа -->
  <div v-if="!props.field.key">
    <div class="font-semibold">{{ props.field.label }}</div>
  </div>
  <!-- Если поле имеет ключ -->
  <div v-else-if="value" class="grid-row-cols">
    <div :class="props.field.attr ?? ''">
      {{ props.field.label }}
    </div>
    <div>
      {{ props.field.foo ? props.field.foo(props.value) : props.value }}
    </div>
  </div>
</template>
