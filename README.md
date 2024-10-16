# ICHC Peer Fix - Installation Instructions

## 1. Download the Extension
- Click the link to download the zip file: [ICHC Peer Fix.zip](https://github.com/sardistic/ICHC-Peer-Fix/blob/main/ICHC%20Peer%20Fix.zip).

## 2. Extract the Files
- Right-click the downloaded zip file and select **Extract All...** to unzip the contents into a folder.

## 3. Open Chrome Extensions Page
- Open Google Chrome and type `chrome://extensions/` in the address bar, then press **Enter**.

## 4. Enable Developer Mode
- In the top right corner of the Extensions page, toggle the **Developer mode** switch to **ON**.

## 5. Load Unpacked Extension
- Click on the **Load unpacked** button.
- Select the folder where you extracted the files from the zip.

## 6. Broadcast as Normal
- Now navigate to the website and attempt to broadcast.

---

### Important Note
Always ensure that you trust the source of any extension before installation and review any code changes.


#### Unimportant Notes
I know there is an error message that occurs "Error in event handler: TypeError: Cannot read properties of undefined (reading 'executeScript') at chrome.webNavigation.onCompleted.addListener.url.hostContains (chrome-extension:/*/background.js:5:26)"
I don't care, it works, I don't want to spend more time on it.
There are probably far better methods to fix this, and ones that don't require re-reloading the un-modified javascripts in the scripts directory, also don't care.
