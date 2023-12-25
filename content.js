let BLOCKED_WEBSITES = []

/* Run `init` function when user visits any page */
init()

/**
 * Init function is only called at initial page load
 */ 
function init() {
    window.addEventListener("load", function(e) {
        chrome.storage.local.get({ urls: [] }, (result) => {
            for (let url of result.urls) {
                BLOCKED_WEBSITES.push(url)
            }

            let url = window.location.href
            if (BLOCKED_WEBSITES.some(website => url.includes(website))) {
                const html = `
                    <h1 style='width: 100%; text-align: center; margin-top: 80px'>It's block party time!</h1>
                    <img src='https://media.giphy.com/media/l3q2zVr6cu95nF6O4/giphy.gif' width='60%' style='margin-left: 20%; margin-right: 20%; margin-top: 40px'/>
                `
                document.getElementsByTagName("body")[0].innerHTML = html
            }
        });   
    });
}