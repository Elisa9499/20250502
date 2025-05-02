let video;

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

  // 在畫布上繪製攝影機影像
  image(video, x, y, videoWidth, videoHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}
