// Core logic to fetch the issues and patch 'em lies here _/\_
let currentUrl = window.location.href;
window.chrome = window.chrome || window.browser;
function getCorrectTextColor(hex) {
  let threshold = 130;
  let hRed = hexToR(hex);
  let hGreen = hexToG(hex);
  let hBlue = hexToB(hex);

  function hexToR(h) {
    return parseInt(cutHex(h).substring(0, 2), 16);
  }
  function hexToG(h) {
    return parseInt(cutHex(h).substring(2, 4), 16);
  }
  function hexToB(h) {
    return parseInt(cutHex(h).substring(4, 6), 16);
  }
  function cutHex(h) {
    return h.charAt(0) === "#" ? h.substring(1, 7) : h;
  }

  let cBrightness = (hRed * 299 + hGreen * 587 + hBlue * 114) / 1000;
  if (cBrightness > threshold) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

export async function useAIMResult() {
  console.log("May the force be with you");
  let searchParams = new URLSearchParams();
  searchParams.append("url", currentUrl);
  searchParams.append("key", "w5c6my9h1475");
  searchParams.append("reporttype", 4);
  searchParams.append("evaldelay", "0");
  let url = `https://wave.webaim.org/api/request?${searchParams}`;
  let report = await fetch(url).then(response => response.json());
  console.log(report);
  let errorCount = report?.categories?.error?.count;
  let fixedErrors = 0;
  fixedErrors += useContrast(report?.categories?.contrast?.items ?? {});
  fixedErrors = fixedErrors + await useAlter(report?.categories?.error?.items ?? {});
  window.chrome.runtime.sendMessage({errors: errorCount, fixed: fixedErrors})
}

function useContrast(items) {
  let fixedImages = 0;
  let { contrastdata = [], selectors = [] } = items?.contrast ?? {};
  contrastdata.forEach((data, i) => {
    // let [score, text, bg] = data;
    let properTextColor = getCorrectTextColor(data[2]);
    if (document.querySelector(selectors[i])) {
      fixedImages++;
      document.querySelector(selectors[i]).style.color = properTextColor;
    }
  });
  return fixedImages;
}

async function useAlter(items) {
  try {
    let imagesToSend = items?.alt_missing?.selectors
      .map(_ => document.querySelector(_))
      .filter(img => img.src?.length > 1)
      .map(img => {
        if (img.src.startsWith("/")) {
          img.src = `${currentUrl}${img.src}`;
        }
        return img;
      });
    let searchParams = new URLSearchParams();
    imagesToSend.forEach(image => {
      searchParams.append("imageUrl", image.src);
    });
    let captions = await fetch(
      `https://positive-curious-couch.glitch.me/alter/describe?${searchParams}`
    ).then(res => res.json());
    let fixedImages = 0;
    captions.forEach((caption, i) => {
      if (caption[0]?.text) {
        fixedImages++;
        imagesToSend[i].alt = caption[0].text;
      }
    });
    return fixedImages;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
