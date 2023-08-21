var boardRadius = 4;
var hSize = hexSize(30,30)


function setup()
{
  createCanvas(windowWidth, windowHeight);
  background('#05282B');
  grid = new HexBoard(hexPointyOrientation, hSize,boardRadius)
}

function draw()
{
  stroke('#601D37');
  push();
  translate(width/2, height/2);
  rotate(Math.sin(frameCount/30));
  scale(Math.cos(frameCount/60));
  fill("#6F6A22")
  grid.drawBoard();
  pop();
}
