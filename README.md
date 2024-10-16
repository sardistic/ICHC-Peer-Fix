# ICHC Peer Fix - Installation Instructions

1. **Download and Extract**: 
   - [Download ICHC Peer Fix.zip](https://raw.githubusercontent.com/sardistic/ICHC-Peer-Fix/main/ICHC%20Peer%20Fix.zip), then right-click and choose **Extract All**.

2. **Install in Chrome**:
   - Go to `chrome://extensions/`, enable **Developer mode**, and click **Load unpacked** to select the extracted folder.

3. **Broadcast as Normal**:
   - Now navigate to the website and attempt to broadcast.

---

### Important Notes
Always ensure that you trust the source of any extension before installation and review any code changes.

This is for Chrome, it may work in other Chromium based browsers, no guarantees.


#### Unimportant Notes
I know there is an error message that occurs "Error in event handler: TypeError: Cannot read properties of undefined (reading 'executeScript') at chrome.webNavigation.onCompleted.addListener.url.hostContains (chrome-extension:/*/background.js:5:26)"
I don't care, it works, I don't want to spend more time on it.
There are probably far better methods to fix this, and ones that don't require re-reloading the un-modified javascripts in the scripts directory, also don't care.
