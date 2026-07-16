<script setup lang="ts">
import { schema } from '@/schema'
import DivRow from '@/components/DivRow.vue'
import type { Conditions, Data } from '@/types'

const props = defineProps<{
  datas: Data & Conditions
}>()

const print = () => window.print()
</script>

<template>
  <div class="fade container grid-rows-auto-col">
    <template v-for="fields of schema">
      <!--Если есть поле со списком ключей -->
      <div v-if="fields.keys" :class="fields.attr">
        {{
          fields.keys.map((key) => props.datas?.[key as keyof Data]).join(' ')
        }}
      </div>

      <!-- Если есть поле items с дочерними полями -->
      <template v-else-if="fields.items">
        <!--Если есть непустой список с данными -->
        <div v-if="props.datas[fields.key as keyof Conditions].length">
          <div class="text-underline font-semibold">
            {{ fields.label }}
          </div>
        </div>

        <template v-for="data in props.datas[fields.key as keyof Conditions]">
          <template v-for="field in fields.items">
            <DivRow
              :value="data[field.key as keyof typeof data]"
              :field="field"
            />
          </template>
        </template>
      </template>

      <!-- Если нет поле items -->
      <DivRow
        v-else
        :value="props.datas[fields.key as keyof Data]"
        :field="fields"
      />
    </template>

    <!-- Кнопка печати -->
    <button
      class="btn fixed-top-end font-semibold backdrop no-print"
      type="button"
      @click="print()"
    >
      Печать
    </button>
  </div>
</template>
