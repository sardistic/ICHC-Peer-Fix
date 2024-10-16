chrome.webNavigation.onCompleted.addListener((details) => {
    // Check if the URL contains the specific host
    if (details.url.includes("icanhazchat.com")) {
        // Use the scripting API to execute your scripts
        chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: [
                "ichcWebRTCPublish.js",
                "ichcPeerConnectionPublish.js",
                "SoundMeter.js",
                "ichcPeerConnectionPlay.js",
                "ichcWebRTCPlay.js",
                "rtc-adapter.js"
            ]
        }).then(() => {
            console.log("Scripts injected successfully.");
        }).catch((error) => {
            console.error("Script injection failed:", error);
        });
    }
}, { url: [{ hostContains: "icanhazchat.com" }] });
