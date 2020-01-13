var boardRadius1 = 3;
var boardRadius2 = 4;
var size;
var originHex;
var hexes1 = [];
var hexes2 = [];
var hexes3 = [];
var mainLayout;
var layout2;



function setup()
{
  createCanvas(windowWidth, windowHeight);
  background('#313975');
  size = Point(40,40);
  mainLayout = hexLayout(pointyOrient, size);
  layout2 = hexLayout(pointyOrient, Point(75,75));
  hexGenerateBoard(boardRadius1, hexes1);
  hexGenerateBoard(boardRadius2, hexes2);
  hexGenerateBoard(boardRadius2, hexes3);
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke('#4C986D');
  push();
  translate(0, height/2);
  var diag = [hexGetDiagonal(originHex,0),hexGetDiagonal(originHex,1),hexGetDiagonal(originHex,2),
              hexGetDiagonal(originHex,3),hexGetDiagonal(originHex,4),hexGetDiagonal(originHex,5)];
  var ring = hexGetRing(originHex, 4);
  for (var i = 0; i < hexes2.length; i++)
  {
    if (hexIsEquals(hexes2[i], originHex))
    {
      hexDraw(layout2, hexes2[i], '#003D1B');
    }
    else if(hexInArray(hexes2[i],diag))
    {
      hexDraw(layout2, hexes2[i], '#0F5B30');
    }
    else if(hexInArray(hexes2[i],ring))
    {
      hexDraw(layout2, hexes2[i], '#28794B');
    }
    hexDraw(layout2, hexes2[i], color(0,0,0,0));
  }
  pop();

  //board3
  push();
  translate(width, height/2);
  for (var i = 0; i < hexes3.length; i++)
  {
    if (hexIsEquals(hexes2[i], originHex))
    {
      hexDraw(layout2, hexes3[i], '#003D1B');
    }
    else if(hexInArray(hexes3[i],diag))
    {
      hexDraw(layout2, hexes3[i], '#0F5B30');
    }
    else if(hexInArray(hexes3[i],ring))
    {
      hexDraw(layout2, hexes3[i], '#28794B');
    }
    hexDraw(layout2, hexes3[i], color(0,0,0,0));
  }
  pop();

  //board1
  stroke(150);
  var start = color('#032536');
  var end = color('#6E92A1');
  push();
  translate(width/2, height/2);
  for (var i = 0; i < hexes1.length; i++)
  {
    var loc = hex2Screen(mainLayout,hexes1[i]);
    var l = map(loc.x, -width/4, width/4, 0, 1);
    var coord = hexGetCoord(hexes1[i]);
    push();
    hexDraw(mainLayout, hexes1[i], lerpColor(start,end,l));
    pop();
  }
  pop();
}

function hexInArray(hex, arr)
{
  for (var i = 0; i < arr.length; i++)
  {
    if (hexIsEquals(hex, arr[i])) return true;
  }
  return false;
}
