function deleteEventListener(e) {
    const currUrl = e.target.getAttribute('data-id');
    chrome.storage.local.get({ urls: [] }, (result) => {
        let urls = result.urls;
        if (urls.includes(currUrl)) {
            // Remove the URL from the array
            urls = urls.filter(url => url !== currUrl);
    
            // Update the storage with the new array
            chrome.storage.local.set({ urls });

            refreshUrlListFromStorage()
        }
    })
}

document.getElementById('addButton').addEventListener('click', () => {
    let url = document.getElementById('urlInput').value;
    chrome.storage.local.get({ urls: [] }, (result) => {
      let urls = result.urls;
      if (url && !urls.includes(url)) {
        urls.push(url);
        chrome.storage.local.set({ urls });
        refreshUrlListFromStorage()
      }
    });
  });
  
  // Load existing URLs on popup open
  document.addEventListener('DOMContentLoaded', () => {
    refreshUrlListFromStorage()
  });


function refreshUrlListFromStorage() {
    chrome.storage.local.get({ urls: [] }, (result) => {
        let listItems = result.urls.map(currUrl => `<li>${currUrl} <button data-id=${currUrl} class='deleteButton'">❌</button></li>`).join('');
        document.getElementById('urlList').innerHTML = listItems;

        document.querySelectorAll('.deleteButton').forEach(el => el.addEventListener('click', deleteEventListener))
    });
}
