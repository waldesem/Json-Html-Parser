chrome.action.onClicked.addListener((tab) => {
  const internalUrl = chrome.runtime.getURL('index.html')
  chrome.tabs.create({ url: internalUrl })
})
