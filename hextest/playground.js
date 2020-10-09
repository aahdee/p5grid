/*
  This is a file that is for testing features and working out bugs.
*/

var boardRadius = 5; //radius of hex grid
var size; //size of hexes
var originHex; //very center of the board
var hexes = [];
var mainLayout;

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = Point(40, 40);
  mainLayout = hexLayout(pointyOrient, size);
  hexGenerateBoard(boardRadius, hexes);
  originHex = Hex(0, 0, 0);
}

function draw() {
  stroke("#ED8FA5");
  background(50);
  fill(100);
  push();
  translate(width / 2, height / 2);
  hexDrawArray(mainLayout, hexes, "#BE73B2");
  hexDebugGrid(mainLayout, hexes);
  pop();
  playground();
}

function playground() {
  var hexA = Hex(-1, 3, -2);
  //var hexB = getRotate(hexA,1);
  var hexB = hexGetDiagonal(hexA, 0);
  //console.assert(isEqualsHex(hexB,Hex(2,-1,-1)));
  hexDraw(mainLayout, hexA, 255);
  hexDraw(mainLayout, hexB, 190);
}
