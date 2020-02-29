// Core logic to fetch the issues and patch 'em lies here _/\_

readDomForImage();

function readDomForImage() {
  window.chrome.storage.local.get("toggle", function(data) {
    console.log("<><><><><><><><><><><>" + data.toggle);
  });
}
