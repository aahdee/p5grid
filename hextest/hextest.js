var boardRadius = 5; //radius of hex grid
var size; //size of hexes
var originHex; //very center of the board
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  size = Point(10, 10);
  originPixel = Point(0, 0);
  mainLayout = Layout(pointyOrient, size, originPixel)
  generateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#ED8FA5');
  background(50);
  fill(100);
  push();
  translate(width/2, height/2);
  drawHexesArray(mainLayout, hexes, '#BE73B2')
  testFuncAll();
  pop();
  //drawHex(mainLayout, originHex, 0);
  //debugGrid(mainLayout, hexes);
}


//function test holder. you can comment the ones you want to see in and vice versa.
function testFuncAll()
{
  //testBasics();
  //testHexArit();
  //testDiag();
  //testRotate();
  //testHexArea();
  testHexOverlap();

}

function testBasics()
{
  //isHex
  console.assert(isHex(Hex(0,0,0)),true, "fail of isHex on origin case");
  console.assert(isHex(Hex(1,1,1)),false, "fail of isHex on q + r + s = 0. supposed to be false");
  console.assert(isHex(Hex(1,-1,0)),true, "fail of isHex on q + r + s = 0. supposed to be true");
  console.assert(isHex(Hex(25,25,-50)),true, "fail of isHex on q + r + s = 0. supposed to be true");
  console.assert(isHex(Hex(-25,25,-50)),false, "fail of isHex on q + r + s = 0. supposed to be false");

  //is equals Hex
  console.assert(isEqualsHex(Hex(3,-2,-1), Hex(3,-2,-1)), "fail of isEqualsHex. supposed to be true. ");
  console.assert(isEqualsHex(Hex(0,0,0), Hex(0,0,0)), "fail of isEqualsHex. supposed to be true. ");
  console.assert(!isEqualsHex(Hex(3,-2,-1), Hex(0,0,0)), "fail of isEqualsHex. supposed to be true.");
  console.assert(isEqualsHex(Hex(0,1,-1), Hex(0,1,-1)), "fail of isEqualsHex. supposed to be true. ");
  console.assert(isEqualsHex(Hex(50,-25,-25), Hex(50,-25,-25)), "fail of isEqualsHex. supposed to be true.");
  console.assert(!isEqualsHex(Hex(-10,-2,12), Hex(3,-2,-1)), "fail of isEqualsHex. supposed to be true. ");
  console.log("testBasics() complete");
}

function testHexArit()
{
  //visual example
  drawHex(mainLayout, Hex(2,-1,-1), 0);
  drawHex(mainLayout, Hex(2,-3, 1), 40);
  var res = hexAdd(Hex(2,-1,-1),Hex(2,-3, 1));
  console.assert(isEqualsHex(res,Hex(4,-4,0)));
  drawHex(mainLayout, res,80);

  drawHex(mainLayout, Hex(-1,-1,2), 150);
  drawHex(mainLayout, Hex(-2,3, -1), 190);
  res = hexSub(Hex(-1,-1,2),Hex(-2,3, -1));
  console.assert(isEqualsHex(res,Hex(1,-4,3)));
  drawHex(mainLayout, res,230);

  drawHex(mainLayout, Hex(-2,1,1), 'rgb(100,0,0)');
  res = hexMult(Hex(-2,1,1),2);
  console.assert(isEqualsHex(res,Hex(-4,2,2)));
  drawHex(mainLayout, res,'rgb(100,100,0)');


  //more tests
  res = hexAdd(Hex(2,-1,-1),Hex(2,-3, 1));
  console.assert(isEqualsHex(res,Hex(4,-4,0)));
  res = hexAdd(Hex(0,0,0),Hex(0,0, 0));
  console.assert(isEqualsHex(res,Hex(0,0,0)));
  res = hexAdd(Hex(1,3,-4),Hex(-1,-3, 4));
  console.assert(isEqualsHex(res,Hex(0,0,0)));

  res = hexSub(Hex(2,0,-2),Hex(5,3, -8));
  console.assert(isEqualsHex(res,Hex(-3,-3,6)));
  res = hexSub(Hex(10,-1,-9),Hex(2,-1, -1));
  console.assert(isEqualsHex(res,Hex(8,0,-8)));
  res = hexSub(Hex(0,0,0),Hex(-2,3, -1));
  console.assert(isEqualsHex(res,Hex(2,-3,1)));

  res = hexMult(Hex(0,0,0),2);
  console.assert(isEqualsHex(res,Hex(0,0,0)));
  res = hexMult(Hex(-3,-1,4),3);
  console.assert(isEqualsHex(res,Hex(-9,-3,12)));
  res = hexMult(Hex(-2,1,1),-1);
  console.assert(isEqualsHex(res,Hex(2,-1,-1)));
  console.log("testHexArit() complete");

}

function testDiag() //hexs are in a graident to show that it is clockwise
{
  drawHex(mainLayout, originHex, '#19053A');
  for (var i = 0; i < 6; i++)
  {
    var diag = getDiagonal(originHex, i);
    drawHex(mainLayout, diag, 42.5*i);
  }

}
function testRotate()
{
  var hexA = Hex(1,1,-2);
  var hexB = getRotate(hexA);
  console.assert(isEqualsHex(hexB,Hex(2,-1,-1)));
  drawHex(mainLayout, hexA, 255);
  drawHex(mainLayout, hexB, 190);

  hexA = Hex(-1,3,-2);
  hexB = getRotate(hexA);
  console.assert(isEqualsHex(hexB,Hex(2,1,-3)));
  drawHex(mainLayout, hexA, 0);
  drawHex(mainLayout, hexB, 42.5);
  hexB = getRotate(hexA,2);
  console.assert(isEqualsHex(hexB,Hex(3,-2,-1)));
  drawHex(mainLayout, hexB, 85);
  hexB = getRotate(hexA,3);
  console.log(getHexCoord(hexB));
  console.assert(isEqualsHex(hexB,Hex(1,-3,2)));
  drawHex(mainLayout, hexB, 127.5);
  hexB = getRotate(hexA,4);
  console.assert(isEqualsHex(hexB,Hex(-2,-1,3)));
  drawHex(mainLayout, hexB, 170);
  hexB = getRotate(hexA,5);
  console.assert(isEqualsHex(hexB,Hex(-3,2,1)));
  drawHex(mainLayout, hexB, 212.5);

  hexA = Hex(1,3,-4);
  hexB = getRotate(hexA);
  console.assert(isEqualsHex(hexB,Hex(4,-1,-3)));
  drawHex(mainLayout, hexA, 'rgb(100,0,0)');
  drawHex(mainLayout, hexB, 'rgb(100,0,42)');
  hexB = getRotate(hexA,2);
  console.assert(isEqualsHex(hexB,Hex(3,-4,1)));
  drawHex(mainLayout, hexB, 'rgb(100,0,85)');
  hexB = getRotate(hexA,3);
  console.log(getHexCoord(hexB));
  console.assert(isEqualsHex(hexB,Hex(-1,-3,4)));
  drawHex(mainLayout, hexB, 'rgb(100,0,127)');
  hexB = getRotate(hexA,4);
  console.assert(isEqualsHex(hexB,Hex(-4,1,3)));
  drawHex(mainLayout, hexB, 'rgb(100,0,170)');
  hexB = getRotate(hexA,5);
  console.assert(isEqualsHex(hexB,Hex(-3,4,-1)));
  drawHex(mainLayout, hexB, 'rgb(100,0,212)');

}

function testHexArea() //a visual test.
{
  var hex = Hex(0,-1,1);
  var radius = 2;
  var res = hexArea(hex,radius,originHex,boardRadius);
  drawHexesArray(mainLayout, res, 0);
}

function testHexOverlap() //visual test
{
  var hexA = Hex(0,-3,3);
  var hexB = Hex(2,1,-3);
  var radA = 3;
  var radB = 4;
  res = hexArea(hexA,radA,originHex,boardRadius);
  drawHexesArray(mainLayout, res, 0);
  res = hexArea(hexB,radB,originHex,boardRadius);
  drawHexesArray(mainLayout, res, 255);

  var res = hexOverlap2(hexA, hexB, radA, radB, originHex, boardRadius);
  drawHexesArray(mainLayout, res, 100);


}
