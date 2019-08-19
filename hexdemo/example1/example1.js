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
  console.log(windowWidth);
  background('#313975');
  size = Point(40,40);
  originPixel = Point(0, 0);
  mainLayout = Layout(pointyOrient, size, originPixel);
  layout2 = Layout(pointyOrient, Point(75,75), originPixel);
  generateBoard(boardRadius1, hexes1, Hex(0,0,0));
  generateBoard(boardRadius2, hexes2, Hex(0,0,0));
  generateBoard(boardRadius2, hexes3, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  //board2
  stroke('#4C986D');

  push();
  translate(0, height/2);
  var diag = [getDiagonal(originHex,0),getDiagonal(originHex,1),getDiagonal(originHex,2),
              getDiagonal(originHex,3),getDiagonal(originHex,4),getDiagonal(originHex,5)];
  var ring = getRing(originHex, 4);
  for (var i = 0; i < hexes2.length; i++)
  {
    if (isEqualsHex(hexes2[i], originHex))
    {
      drawHex(layout2, hexes2[i], '#003D1B');
    }
    else if(hexInArray(hexes2[i],diag))
    {
      drawHex(layout2, hexes2[i], '#0F5B30');
    }
    else if(hexInArray(hexes2[i],ring))
    {
      drawHex(layout2, hexes2[i], '#28794B');
    }
    drawHex(layout2, hexes2[i], color(0,0,0,0));
  }
  pop();

  //board3
  push();
  translate(width, height/2);
//  drawHexesArray(layout2, hexes3, color(0,0,0,0));
  for (var i = 0; i < hexes3.length; i++)
  {
    if (isEqualsHex(hexes2[i], originHex))
    {
      drawHex(layout2, hexes3[i], '#003D1B');
    }
    else if(hexInArray(hexes3[i],diag))
    {
      drawHex(layout2, hexes3[i], '#0F5B30');
    }
    else if(hexInArray(hexes3[i],ring))
    {
      drawHex(layout2, hexes3[i], '#28794B');
    }
    drawHex(layout2, hexes3[i], color(0,0,0,0));
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
    var coord = getHexCoord(hexes1[i]);
    push();
    drawHex(mainLayout, hexes1[i], lerpColor(start,end,l));
    pop();
  }
  //drawHexesArray(mainLayout, hexes1, '#27556C');
  pop();
}

function hexInArray(hex, arr)
{
  for (var i = 0; i < arr.length; i++)
  {
    if (isEqualsHex(hex, arr[i])) return true;
  }
  return false;
}
