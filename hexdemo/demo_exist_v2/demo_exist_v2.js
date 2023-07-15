var boardRadius = 5;
var hSize = hexSize(30,30);

function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(25);
  angleMode(DEGREES);
  grid1 = new HexBoard(hexPointyOrientation, hSize, boardRadius);
}

function draw()
{
  stroke('#A45287');
  background(50);
  push();
  translate(width/2, height/2);
  fill("#42002b");
  grid1.drawBoard();
  pop();
}