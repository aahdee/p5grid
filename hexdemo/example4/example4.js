var boardRadius = 50;
var size;
var originHex;
var hexes = [];
var mainLayout;


function setup()
{
  frameRate(5);
  createCanvas(windowWidth, windowHeight);
  background(241, 211, 222);
  angleMode(degrees);
  size = Point(10,10);
  originPixel = Point(0, 0);
  mainLayout = Layout(pointyOrient, size, originPixel)
  generateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  //noStroke();
  stroke(168, 76, 110);
  push();
  background(241, 211, 222,125);
  translate(width/2, height/2);
  //rotate(Math.sin(frameCount/30));
  //scale(Math.cos(frameCount/60))
  for (var i = 0; i < hexes.length; i++)
  {
    //var pt = hex2Screen(mainLayout, hexes[i]);
    //if (pt.x + size.x <= mouseX && mouseX <= pt.)
    if (hexDistance(originHex, hexes[i]) % 6 == frameCount % 6)
    {

      drawHex(mainLayout, hexes[i], color(205, 128, 156));
    }

  }

  /*push();
  scale(3);
  drawHex(mainLayout, originHex, '#42002B');
  pop();*/
  //drawHexesArray(mainLayout, hexes, '#42002B')
  pop();
}

function hexDistance(hexa, hexb)
{
  return Math.max(Math.abs(hexa.q-hexb.q), Math.abs(hexa.r - hexb.r), Math.abs(hexa.s - hexb.s));
}
