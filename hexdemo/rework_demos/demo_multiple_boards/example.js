var boardRadius1 = 8;
var boardRadius2 = 4;
var hSize1 = hexSize(20,20);
var hSize2 = hexSize(50,70);
var originHex;
var hexes1 = [];
var hexes2 = [];
var hexes3 = [];
var mainLayout;
var layout2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#313975");

  centerGrid = new HexBoard(hexPointyOrientation, hSize1, boardRadius1);
  leftGrid = new HexBoard(hexPointyOrientation, hSize2, boardRadius2);
  rightGrid = new HexBoard(hexPointyOrientation, hSize2, boardRadius2);
}

function draw() {
  stroke("#4C986D");
  push();
  translate(0, height / 2);
  fill("#003D1B");
  leftGrid.drawBoard();
  // var diag = [
  //   hexGetDiagonal(originHex, 0),
  //   hexGetDiagonal(originHex, 1),
  //   hexGetDiagonal(originHex, 2),
  //   hexGetDiagonal(originHex, 3),
  //   hexGetDiagonal(originHex, 4),
  //   hexGetDiagonal(originHex, 5),
  // ];
  // var ring = hexGetRing(originHex, 4);
  // for (var i = 0; i < hexes2.length; i++) {
  //   if (hexIsEquals(hexes2[i], originHex)) {
  //     fill("#003D1B");
  //     hexDraw(layout2, hexes2[i]);
  //   } else if (hexInArray(hexes2[i], diag)) {
  //     fill("#0F5B30");
  //     hexDraw(layout2, hexes2[i]);
  //   } else if (hexInArray(hexes2[i], ring)) {
  //     fill("#28794B");
  //     hexDraw(layout2, hexes2[i]);
  //   }
  //   fill(color(0, 0, 0, 0));
  //   hexDraw(layout2, hexes2[i]);
  // }
  pop();

  //board3
  push();
  translate(width, height / 2);
  fill("#0F5B30");
  rightGrid.drawBoard();
  // for (var i = 0; i < hexes3.length; i++) {
  //   if (hexIsEquals(hexes2[i], originHex)) {
  //     fill("#003D1B");
  //     hexDraw(layout2, hexes3[i]);
  //   } else if (hexInArray(hexes3[i], diag)) {
  //     fill("#0F5B30");
  //     hexDraw(layout2, hexes3[i]);
  //   } else if (hexInArray(hexes3[i], ring)) {
  //     fill("#28794B");
  //     hexDraw(layout2, hexes3[i]);
  //   }
  //   fill(color(0, 0, 0, 0));
  //   hexDraw(layout2, hexes3[i]);
  // }
  pop();

  //board1
  stroke(150);
  var start = color("#032536");
  var end = color("#6E92A1");
  push();
  translate(width / 2, height / 2);
  fill("#28794B");
  centerGrid.drawBoard()
  // for (var i = 0; i < hexes1.length; i++) {
  //   var loc = hex2Screen(mainLayout, hexes1[i]);
  //   var l = map(loc.x, -width / 4, width / 4, 0, 1);
  //   var coord = hexGetCoord(hexes1[i]);
  //   push();
  //   fill(lerpColor(start, end, l));
  //   hexDraw(mainLayout, hexes1[i]);
  //   pop();
  // }

  pop();
}

function hexInArray(hex, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (hexIsEquals(hex, arr[i])) return true;
  }
  return false;
}
