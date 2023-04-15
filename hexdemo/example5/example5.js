var boardRadius = 10;
var r = 3;
var size;
var size2;
var originHex;
var hexes = [];
var hexes2 = [];
var hexes3 = [];
var mainLayout;
var mainLayout2;
var mainLayout3;
var fromFill, toFill, fromStroke, toStroke;

function setup() {
  createCanvas(1050, 1050);
  background("#CBDFBD");
  angleMode(degrees);
  size = Point(20, 20);
  size2 = Point(40, 40);
  mainLayout = hexLayout(pointyOrient, size);
  mainLayout2 = hexLayout(pointyOrient, size2);
  mainLayout3 = hexLayout(flatOrient, size2);
  hexGenerateBoard(13, hexes);
  hexGenerateBoard(7, hexes2);
  hexGenerateBoard(r, hexes3);
  originHex = Hex(0, 0, 0);
  stroke("#F19C79");
  strokeWeight(3);
  fromFill = color("rgba(246, 244,210,255)");
  toFill = color("rgba(246, 244,210,0)");
  fromStroke = color("rgba(164,74,63,255)");
  toStroke = color("rgba(164,74,63,0)");
}

function draw() {
  background("#CBDFBD");
  push();
  translate(width / 2, height / 2);
  //hexDrawArray(mainLayout, hexes, '#F6F4D2');
  for (var i = 0; i < hexes.length; i++) {
    var hex = hexes[i];
    var dist = map(hexDistance(hex, originHex), 0, 10, 0, 1);
    var alpha = lerp(0, 100, dist);
    stroke(164, 74, 63, alpha);
    //print(alpha);
    if (hex.q % 2 == 0 && hex.s % 2 == 0) {
      fill(color(246, 244, 210, alpha));
      hexDraw(mainLayout, hex);
    }
  }

  stroke("#EA9675");
  for (var i = 0; i < hexes3.length; i++) {
    var hex = hexes3[i];

    if (hex.q == 0 && hex.r == 0 && hex.s == 0) continue;
    if (hex.q % 2 == 0 && hex.s % 2 == 0) {
      fill("#CDD895");
      hexDraw(mainLayout3, hex);
    }
  }

  stroke("#F19C79");
  for (var i = 0; i < hexes.length; i++) {
    if (hexes2[i].q == 0 && hexes2[i].r == 0 && hexes2[i].s == 0) {
      fill("#FFFBB5");
      hexDraw(mainLayout2, hexes2[i]);
    } else if (hexes2[i].q % 2 == 0 && hexes2[i].s % 2 == 0) {
      fill("#D4E09B");
      hexDraw(mainLayout2, hexes2[i]);
    }
  }
  pop();
}
