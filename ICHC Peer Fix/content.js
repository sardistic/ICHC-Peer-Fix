if (!document.getElementById('ichcScript')) {
    const ichcScript = document.createElement("script");
    ichcScript.src = chrome.runtime.getURL("ichcWebRTCPublish.js");
    ichcScript.id = 'ichcScript'; // Adding an id to ensure uniqueness
    ichcScript.onload = function() {
        this.remove(); // Clean up after the script is loaded
    };
    (document.head || document.documentElement).appendChild(ichcScript);
}
