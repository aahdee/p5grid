var boardRadius = 5; //radius of hex grid
var size; //size of hexes
var originHex; //very center of the board
var hexes = [];
var mainLayout;

function setup() {
  createCanvas(windowWidth, windowHeight);
  size = Point(15, 15);
  originPixel = Point(0, 0);
  mainLayout = hexLayout(pointyOrient, size, originPixel);
  hexGenerateBoard(boardRadius, hexes, Hex(0, 0, 0));
  originHex = Hex(0, 0, 0);
  noLoop();
}

function draw() {
  stroke("#ED8FA5");
  background(50);
  fill(100);
  push();
  translate(width / 2, height / 2);
  fill("#BE73B2");
  hexDrawArray(mainLayout, hexes);
  hexDebugGrid(mainLayout, hexes);
  testFuncAll();
  pop();
  //hexDraw(mainLayout, originHex, 0);
}

//function test holder. you can comment the ones you want to see in and vice versa.
function testFuncAll() {
  //testBasics();
  //testHexArit();
  //testDiag();
  //testRotate();
  //testHexArea();
  testHexOverlap();
}

function testBasics() {
  //isHex
  console.assert(isHex(Hex(0, 0, 0)), true, "fail of isHex on origin case");

  try {
    isHex(Hex(1, 1, 1));
  } catch (error) {
    print("passed catching bad hex");
  }

  console.assert(
    isHex(Hex(1, -1, 0)),
    true,
    "fail of isHex on q + r + s = 0. supposed to be true"
  );
  console.assert(
    isHex(Hex(25, 25, -50)),
    true,
    "fail of isHex on q + r + s = 0. supposed to be true"
  );
  try {
    isHex(Hex(-25, 25, -50));
  } catch (error) {
    print("passed catching bad hex");
  }

  //is equals Hex
  console.assert(
    hexIsEquals(Hex(3, -2, -1), Hex(3, -2, -1)),
    "fail of hexIsEquals. supposed to be true. "
  );
  console.assert(
    hexIsEquals(Hex(0, 0, 0), Hex(0, 0, 0)),
    "fail of hexIsEquals. supposed to be true. "
  );
  console.assert(
    !hexIsEquals(Hex(3, -2, -1), Hex(0, 0, 0)),
    "fail of hexIsEquals. supposed to be true."
  );
  console.assert(
    hexIsEquals(Hex(0, 1, -1), Hex(0, 1, -1)),
    "fail of hexIsEquals. supposed to be true. "
  );
  console.assert(
    hexIsEquals(Hex(50, -25, -25), Hex(50, -25, -25)),
    "fail of hexIsEquals. supposed to be true."
  );
  console.assert(
    !hexIsEquals(Hex(-10, -2, 12), Hex(3, -2, -1)),
    "fail of hexIsEquals. supposed to be true. "
  );
  console.log("testBasics() complete");
}

function testHexArit() {
  //visual example
  fill(0);
  hexDraw(mainLayout, Hex(2, -1, -1));
  fill(40);
  hexDraw(mainLayout, Hex(2, -3, 1));
  var res = hexAdd(Hex(2, -1, -1), Hex(2, -3, 1));
  console.assert(hexIsEquals(res, Hex(4, -4, 0)));
  fill(80);
  hexDraw(mainLayout, res);

  fill(150);
  hexDraw(mainLayout, Hex(-1, -1, 2));
  fill(190);
  hexDraw(mainLayout, Hex(-2, 3, -1));
  res = hexSub(Hex(-1, -1, 2), Hex(-2, 3, -1));
  console.assert(hexIsEquals(res, Hex(1, -4, 3)));
  fill(230);
  hexDraw(mainLayout, res);

  fill("rgb(100,0,0)");
  hexDraw(mainLayout, Hex(-2, 1, 1));
  res = hexMult(Hex(-2, 1, 1), 2);
  console.assert(hexIsEquals(res, Hex(-4, 2, 2)));
  fill("rgb(100,100,0)");
  hexDraw(mainLayout, res);

  //more tests
  res = hexAdd(Hex(2, -1, -1), Hex(2, -3, 1));
  console.assert(hexIsEquals(res, Hex(4, -4, 0)));
  res = hexAdd(Hex(0, 0, 0), Hex(0, 0, 0));
  console.assert(hexIsEquals(res, Hex(0, 0, 0)));
  res = hexAdd(Hex(1, 3, -4), Hex(-1, -3, 4));
  console.assert(hexIsEquals(res, Hex(0, 0, 0)));

  res = hexSub(Hex(2, 0, -2), Hex(5, 3, -8));
  console.assert(hexIsEquals(res, Hex(-3, -3, 6)));
  res = hexSub(Hex(10, -1, -9), Hex(2, -1, -1));
  console.assert(hexIsEquals(res, Hex(8, 0, -8)));
  res = hexSub(Hex(0, 0, 0), Hex(-2, 3, -1));
  console.assert(hexIsEquals(res, Hex(2, -3, 1)));

  res = hexMult(Hex(0, 0, 0), 2);
  console.assert(hexIsEquals(res, Hex(0, 0, 0)));
  res = hexMult(Hex(-3, -1, 4), 3);
  console.assert(hexIsEquals(res, Hex(-9, -3, 12)));
  res = hexMult(Hex(-2, 1, 1), -1);
  console.assert(hexIsEquals(res, Hex(2, -1, -1)));
  console.log("testHexArit() complete");
}

function testDiag() {
  //hexs are in a graident to show that it is clockwise
  fill("#19053A");
  hexDraw(mainLayout, Hex(1, 0, -1));
  for (var i = 0; i < 6; i++) {
    var diag = hexGetDiagonal(Hex(1, 0, -1), i);
    fill(42.5 * i);
    hexDraw(mainLayout, diag);
  }
}
function testRotate() {
  let hexA = Hex(1, 1, -2);
  let hexB = hexGetRotate(hexA);
  console.assert(hexIsEquals(hexB, Hex(2, -1, -1)));
  fill(255);
  hexDraw(mainLayout, hexA);
  fill(190);
  hexDraw(mainLayout, hexB);

  //clockwise rotation
  let clockwise = () => {
    hexA = Hex(-1, 3, -2);
    hexB = hexGetRotate(hexA, 60);
    console.assert(hexIsEquals(hexB, Hex(2, 1, -3)));
    fill(0);
    hexDraw(mainLayout, hexA, 0);
    fill(42.5);
    hexDraw(mainLayout, hexB, 42.5);
    hexB = hexGetRotate(hexA, 120);
    console.assert(hexIsEquals(hexB, Hex(3, -2, -1)));
    fill(85);
    hexDraw(mainLayout, hexB, 85);
    hexB = hexGetRotate(hexA, 180);
    console.assert(hexIsEquals(hexB, Hex(1, -3, 2)));
    fill(127.5);
    hexDraw(mainLayout, hexB, 127.5);
    hexB = hexGetRotate(hexA, 240);
    console.assert(hexIsEquals(hexB, Hex(-2, -1, 3)));
    fill(170);
    hexDraw(mainLayout, hexB, 170);
    hexB = hexGetRotate(hexA, 300);
    console.assert(hexIsEquals(hexB, Hex(-3, 2, 1)));
    fill(212.5);
    hexDraw(mainLayout, hexB, 212.5);
  };

  //counter clockwise rotation
  let counterClockwise = () => {
    hexA = Hex(1, 3, -4);
    hexB = hexGetRotate(hexA, -60);
    console.assert(hexIsEquals(hexB, Hex(4, -1, -3)));
    fill("rgb(100,0,0)");
    hexDraw(mainLayout, hexA, "rgb(100,0,0)");
    fill("rgb(100,0,42)");
    hexDraw(mainLayout, hexB, "rgb(100,0,42)");
    hexB = hexGetRotate(hexA, -120);
    console.assert(hexIsEquals(hexB, Hex(3, -4, 1)));
    fill("rgb(100,0,85)");
    hexDraw(mainLayout, hexB, "rgb(100,0,85)");
    hexB = hexGetRotate(hexA, -180);
    console.assert(hexIsEquals(hexB, Hex(-1, -3, 4)));
    fill("rgb(100,0,127)");
    hexDraw(mainLayout, hexB, "rgb(100,0,127)");
    hexB = hexGetRotate(hexA, -240);
    console.assert(hexIsEquals(hexB, Hex(-4, 1, 3)));
    fill("rgb(100,0,170)");
    hexDraw(mainLayout, hexB, "rgb(100,0,170)");
    hexB = hexGetRotate(hexA, -300);
    console.assert(hexIsEquals(hexB, Hex(-3, 4, -1)));
    fill("rgb(100,0,212)");
    hexDraw(mainLayout, hexB, "rgb(100,0,212)");
  };
  //greator than 360 angle
  let greatorThan360 = () => {
    hexA = Hex(-1, 3, -2);
    hexB = hexGetRotate(hexA, 420);
    console.assert(hexIsEquals(hexB, Hex(2, 1, -3)));
    fill(0);
    hexDraw(mainLayout, hexA, 0);
    fill(125);
    hexDraw(mainLayout, hexB, 125);
    hexB = hexGetRotate(hexA, 480);
    console.assert(hexIsEquals(hexB, Hex(3, -2, -1)));
    fill(255);
    hexDraw(mainLayout, hexB, 255);
    hexB = hexGetRotate(hexA, 540);
    console.assert(hexIsEquals(hexB, Hex(1, -3, 2)));
    fill(0);
    hexDraw(mainLayout, hexB, 0);
    hexB = hexGetRotate(hexA, 600);
    console.assert(hexIsEquals(hexB, Hex(-2, -1, 3)));
    fill(125);
    hexDraw(mainLayout, hexB, 125);
    hexB = hexGetRotate(hexA, 660);
    console.assert(hexIsEquals(hexB, Hex(-3, 2, 1)));
    fill(255);
    hexDraw(mainLayout, hexB, 255);
  };
  //clockwise();
  //counterClockwise();
  greatorThan360();
}

function testHexArea() {
  //a visual test.
  let hex = Hex(0, -4, 4);
  let radius = 3;
  let res = hexArea(hex, radius, boardRadius);
  print(res);
  fill(255);
  hexDrawArray(mainLayout, res);
}

function testHexOverlap() {
  //visual test
  var hexA = Hex(0, -3, 3);
  var hexB = Hex(2, 1, -3);
  var radA = 3;
  var radB = 4;

  var res = hexArea(hexA, radA, boardRadius);
  fill(0);
  hexDrawArray(mainLayout, res);
  var res = hexArea(hexB, radB, boardRadius);
  fill(255);
  hexDrawArray(mainLayout, res);

  var res = hexOverlap(hexA, hexB, radA, radB, boardRadius);
  fill(100);
  hexDrawArray(mainLayout, res);
}
