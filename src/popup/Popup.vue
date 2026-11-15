<script setup lang="ts">
async function openApp() {
  // Всегда открываем главную страницу в новой вкладке
  await chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })
  window.close()
}
</script>

<template>
  <div class="popup">
    <p class="popup-title">{ JSON } → HTML</p>
    <button type="button" class="btn font-bold" @click="openApp">
      Открыть страницу
    </button>
  </div>
</template>
