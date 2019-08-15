var radius = 0; //radius of hex grid
var size; //size of hexes
var originPixel; //very center of the board
var hexes = [];
var mainLayout;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  size = Point(50, 50);
  originPixel = Point(windowWidth/2, windowHeight/2)
  mainLayout = Layout(pointyOrient, size, originPixel)
  generateBoard(radius, hexes);
  center = Hex(0,0,0);
}

function draw()
{
  stroke('#ED8FA5');
  background(100);
  fill(100);

  for (var i = 0; i < hexes.length; i++)
  {
    drawHex(mainLayout, hexes[i], '#BE73B2');
  }
}
