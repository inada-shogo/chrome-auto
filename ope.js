const urlPath = location.href;

const sec = 3; // はじめの待つ秒数を記述
let timeCount = 1; // タイムカウント変数

let productListCount = localStorage.getItem('productListCount') !== null ? localStorage.getItem('productListCount') : 0;

const endAutoOperate = () => {
    console.log("処理を終了します。");
    localStorage.setItem('productListCount', 0); //終了　ローカスストレージを空にする
}

const locationHrefEdit = (url) => {
    console.log("画面遷移を開始");
    location.href = url // 取得したリンク先に遷移　　（それぞれのリンクが取得可能）
}

const getProductList = () => {
    const DOM = document.getElementById("currentListing");
    const productList = DOM.getElementsByTagName('mer-list-item'); // 商品の全体のDOM要素を取得後、商品の全体のDOM要素の中の商品情報を取得
    productListCount < productList.length ? locationHrefEdit(productList[productListCount].getElementsByTagName('a')[0].href) : endAutoOperate();
}

/**
 * sec秒待機後処理を発火する関数
 */
const showWaitTime = () => {
    const interValId = setInterval(() => {
        if (timeCount === sec) {
            clearInterval(interValId);
            getProductList();
        }
        console.group(timeCount,"s経過");
        timeCount++;
    }, 1000);
}

const editItem = () => {
    console.log("商品を編集するプログラムが発火します");
    productListCount++;
    localStorage.setItem('productListCount', productListCount);
    setTimeout(() => {
        console.log("管理画面に遷移");
        location.href = "https://jp.mercari.com/mypage/listings";
    },3000); 
}

console.info("chrome拡張起動しました。", sec,"秒後に処理を開始します。");
urlPath.includes("item") ? editItem() : showWaitTime();
