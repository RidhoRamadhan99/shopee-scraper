chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      function: startScraping,
    });
  }
});

async function startScraping() {
  const data = await scrapeCurrentPage();
  chrome.runtime.sendMessage({
    action: "scrapingComplete",
    data: data,
  });
}
