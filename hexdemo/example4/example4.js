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
  mainLayout = hexLayout(pointyOrient, size);
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw()
{
  stroke(168, 76, 110);
  push();
  background(241, 211, 222,125);
  translate(width/2, height/2);
  for (var i = 0; i < hexes.length; i++)
  {
    if (hexDistance(originHex, hexes[i]) % 6 == frameCount % 6)
    {
      hexDraw(mainLayout, hexes[i], color(205, 128, 156));
    }
  }
  pop();
}
