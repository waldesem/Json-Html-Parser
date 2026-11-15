<script setup lang="ts">
import type { PropType } from 'vue'

const message = defineModel<string | null>()

const props = defineProps({
  status: {
    type: String as PropType<'error' | 'success'>,
    required: true,
  },
})

const colors = {
  error: '#ef4444',
  success: '#42C773',
}
</script>

<template>
  <div v-if="message" class="toast toast-color fixed-bottom-end no-print">
    <span>{{ message }}</span>
    <button class="toast-btn" @click="message = null">&times;</button>
  </div>
</template>

<style scoped>
.toast-color {
  background-color: v-bind(colors[status]);
}
</style>
