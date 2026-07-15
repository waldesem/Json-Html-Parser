<script setup lang="ts">
const error = defineModel<string | null>()
</script>

<template>
  <div v-if="error" class="toast-error fixed-bottom-end">
    <span>{{ error }}</span>
    <button @click="error = null">&times;</button>
  </div>
</template>
