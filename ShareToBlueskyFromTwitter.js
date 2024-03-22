// ==UserScript==
// @name         Share to Bluesky from Twitter
// @namespace    https://yahoo.co.jp
// @version      1.0.0
// @description  Twitter（現X）のポストをBlueskyに共有するボタンを追加します
// @author       インターネット老人会メンバー
// @license      MIT
// @match        https://twitter.com/*
// @exclude
// @grant        none
// ==/UserScript==

let isOpen = false;

function createElement(str) {
    const tmp = document.createElement("div");
    tmp.innerHTML = str;
    return tmp.firstElementChild;
}

function execWorkflow() {
    const menu = document.querySelector(
        ".css-175oi2r.r-j2cz3j.r-14lw9ot.r-1q9bdsx.r-1upvrn0.r-1udh08x.r-u8s1d [data-testid=Dropdown]"
    );

    if (isOpen || !location.href.includes("/status/")) {
        if (menu === null) {
            isOpen = false;
        }
    } else {
        if (menu) {
            const elementString =
                '<div role="menuitem" tabindex="0" class="css-175oi2r r-1loqt21 r-18u37iz r-ymttw5 r-1f1sjgu r-13qz1uu r-o7ynqc r-6416eg r-1ny4l3l"><div class="css-175oi2r r-1777fci r-j2kj52"><svg class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-18jsvk2 r-1q142lx" viewBox="0 0 568 501" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z" fill="black"/></svg></div><div class="css-175oi2r r-16y2uox r-1wbh5a2"><div dir="ltr" class="css-1rynq56 r-bcqeeo r-qvutc0 r-1tl8opc r-a023e6 r-rjixqe r-b88u0q" style="text-overflow: unset; color: rgb(15, 20, 25);"><span class="css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc" style="text-overflow: unset;">Blueskyに共有する</span></div></div></div>';
            const element = createElement(elementString);
            const post = document.querySelector(
                ".css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-1inkyih.r-16dba41.r-bnwqim.r-135wba7[data-testid=tweetText] span"
            ).innerHTML;
            element.addEventListener("click", async () => {
                const url = encodeURI(
                    "https://bsky.app/intent/compose?text=" + post + " " + location.href
                );
                window.open(url);
            });

            menu.insertAdjacentElement("beforeend", element);

            isOpen = true;
        }
    }
}

// メイン処理の実行タイミングが、windowのロード時となるように登録する
window.addEventListener("load", async function () {
    this.setInterval(execWorkflow, 100);
});
