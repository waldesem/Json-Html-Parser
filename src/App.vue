<script setup lang="ts">
import { ref } from 'vue'
import { useFileDialog } from '@vueuse/core'
import { schema } from './schema'
import TableBody from './components/TableBody.vue'
import TableRow from './components/TableRow.vue'
import type { Conditions, Data } from './types'

const { open, onChange } = useFileDialog({
  accept: '*.json',
  multiple: false,
})

const data = ref<(Data & Conditions) | null>(null)

onChange(async (files) => {
  if (files) {
    const str = (await files[0]?.text()) as string
    data.value = JSON.parse(str)
  }
})
</script>

<template>
  <div v-if="data">
    <table class="table caption-top">
      <caption>
        {{
          `${data.positionName} ${data.department}`
        }}
      </caption>
      <tr>
        <th colspan="2">
          {{ `${data.lastName} ${data.firstName} ${data.midName ?? ''}` }}
        </th>
      </tr>
      <template v-for="field of schema">
        <TableBody
          v-if="field.items"
          :datas="data[field.key as keyof Conditions]"
          :fields="field.items"
          :label="field.label"
        />
        <TableRow v-else :value="data[field.key as keyof Data]" :field="field" />
      </template>
    </table>
  </div>
  <button v-else type="button" @click="open()">Choose file</button>
</template>
