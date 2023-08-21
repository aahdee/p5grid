var boardRadius = 15;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(128, 141, 108);
  angleMode(DEGREES);
  size = Point(30, 30);
  mainLayout = hexLayout(flatOrient, size);
  hexGenerateBoard(boardRadius, hexes);
  originHex = Hex(0, 0, 0);
  frameRate(60);
}

function draw() {
  stroke("#182308");
  background(128, 141, 108);
  push();
  translate(width / 2, height / 2);
  for (var i = 0; i < hexes.length; i++) {
    var dist = Math.abs(hexDistance(originHex, hexes[i]));
    if (dist % 2 == 0) {
      push();
      rotate(frameCount / 2);
      fill("#2E3F14");
      hexDraw(mainLayout, hexes[i]);
      pop();
    } else {
      push();
      rotate(-frameCount / 2);
      fill("#46562D");
      hexDraw(mainLayout, hexes[i]);
      pop();
    }
  }
  pop();
}
