<script setup lang="ts">
// Страница приложения, которую открывает кнопка popup
const APP_PAGE = 'index.html'

async function openApp() {
  const inExtension =
    typeof chrome !== 'undefined' && Boolean(chrome.runtime?.id)

  // Фолбэк для запуска popup вне расширения (npm run dev)
  if (!inExtension) {
    window.open(`/${APP_PAGE}`, '_blank', 'noopener')
    return
  }

  // Всегда открываем главную страницу в новой вкладке
  await chrome.tabs.create({ url: chrome.runtime.getURL(APP_PAGE) })
  window.close()
}
</script>

<template>
  <div class="popup">
    <p class="popup__title">
      { JSON } <span class="popup__arrow">→</span> HTML
    </p>
    <button type="button" class="btn font-bold popup__btn" @click="openApp">
      Открыть приложение
      <svg
        class="popup__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path
          d="M2 8h10M8 3l5 5-5 5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
}

.popup {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 260px;
  padding: 16px;
}

.popup__title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  white-space: nowrap;
}

.popup__arrow {
  display: inline-block;
  font-weight: 400;
}

.popup__hint {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: #555;
  text-align: center;
}

.popup__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
}

.popup__btn:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.popup__icon {
  transition: transform 0.3s ease-in-out;
}

.popup__btn:hover .popup__icon {
  transform: translateX(3px);
}
</style>
