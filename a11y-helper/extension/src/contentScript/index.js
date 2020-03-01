import { useAIMResult } from "./useAIMResult";

window.chrome = window.chrome || window.browser;
checkAndFix();

function checkAndFix() {
  window.chrome.storage.local.get("toggle", function(data) {
    if (data.toggle) {
      useAIMResult();
    }
    console.log("<><><><><><><><><><><>" + data.toggle);
  });
}