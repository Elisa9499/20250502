let video;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 設定畫布為全螢幕
  video = createCapture(VIDEO); // 解取攝影機影像
  video.hide(); // 隱藏預設的 HTML 元素
}

function draw() {
  background('#bde0fe'); // 設定背景顏色為 bde0fe

  // 計算影像的寬高為視窗大小的 80%
  let videoWidth = width * 0.8;
  let videoHeight = height * 0.8;

  // 設定影像大小
  video.size(videoWidth, videoHeight);

  // 計算影像顯示的位置，使其位於視窗中央
  let x = (width - videoWidth) / 2;
  let y = (height - videoHeight) / 2;

  // 翻轉畫布以修正影像左右顛倒
  push(); // 儲存當前繪圖設定
  translate(width, 0); // 將畫布原點移動到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(video, x, y, videoWidth, videoHeight); // 繪製影像
  pop(); // 恢復繪圖設定

  // 如果 overlayGraphics 尚未初始化，則初始化
  if (!overlayGraphics) {
    overlayGraphics = createGraphics(videoWidth, videoHeight); // 建立與視訊畫面相同大小的圖形
  }

  // 在 overlayGraphics 上繪製內容
  overlayGraphics.clear(); // 清除之前的內容
  overlayGraphics.background(0); // 設定背景顏色為黑色

  // 每隔 20 繪製一個方框，方框的顏色取自 video 的相對位置
  for (let i = 0; i < videoWidth; i += 20) {
    for (let j = 0; j < videoHeight; j += 20) {
      let col = video.get(i, j); // 取得 video 中相對位置的顏色

      // 繪製方框
      overlayGraphics.fill(col); // 設定方框的顏色
      overlayGraphics.noStroke();
      overlayGraphics.rect(i + 1, j + 1, 18, 18); // 繪製方框，稍微縮小以避免重疊

      // 繪製中間的黑色圓
      overlayGraphics.fill(0); // 設定圓的顏色為黑色
      overlayGraphics.ellipse(i + 10, j + 10, 5, 5); // 繪製圓，置於方框中央
    }
  }

  // 將 overlayGraphics 顯示在視訊畫面上方
  image(overlayGraphics, x, y);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  overlayGraphics = null; // 重置 overlayGraphics，讓它在下一次 draw() 中重新初始化
}
