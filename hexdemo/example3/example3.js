var boardRadius = 15;
var size;
var originHex;
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(128, 141, 108);
  angleMode(DEGREES);
  size = Point(30,30);
  originPixel = Point(0, 0);
  mainLayout = Layout(flatOrient, size, originPixel)
  generateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
  frameRate(60);
}

function draw()
{
  stroke('#182308');
  background(128, 141, 108);
  push();
  translate(width/2, height/2);
  //rotate(frameCount/2);
  //scale(Math.cos(frameCount/60))
  for(var i = 0; i < hexes.length; i++)
  {
    var dist = Math.abs(hexDistance(originHex,hexes[i]));
    if (dist % 2 == 0)
    {
      push();
      rotate(frameCount/2);
      drawHex(mainLayout, hexes[i], '#2E3F14');
      pop();
    }
    else
    {
      push();
      rotate(-frameCount/2);
      drawHex(mainLayout, hexes[i], '#46562D');
      pop();
    }
  }
  //drawHexesArray(mainLayout, hexes, '#46562D')
  pop();
}

function hexDistance(hexa, hexb)
{
  return Math.max(Math.abs(hexa.q-hexb.q), Math.abs(hexa.r - hexb.r), Math.abs(hexa.s - hexb.s));
}
