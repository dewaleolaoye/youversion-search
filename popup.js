chrome.action.onClicked.addListener((tab) => {
  console.log('tab', tab);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      // console.log('hello from the injected script!');
      alert('You clicked the button!');
    },
  });
});

const _URL = 'https://www.bible.com/search/bible?query=';
function searchYouVersion(item, tab) {
  const url = new URL(`${_URL}${item.selectionText}`);
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });
}

chrome.contextMenus.removeAll(function () {
  chrome.contextMenus.create({ id: 'youVersionContextMenu', title: 'Search in YouVersion', contexts: ['selection'] });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
  const url = new URL(`${_URL}${item.selectionText}`);
  console.log('item', item);
  chrome.tabs.create({ url: url.href, index: tab.index + 1 });
});
