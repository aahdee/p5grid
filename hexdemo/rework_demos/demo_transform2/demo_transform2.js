var boardRadius = 4;
var hSize = hexSize(30,30);


function setup()
{
  createCanvas(windowWidth, windowHeight);
  background(25);
  grid = new HexBoard(hexPointyOrientation, hSize, boardRadius)
}

function draw()
{
  stroke('#A45287');
  background(25);
  push();
  translate(width/2, height/2);
  rotate(Math.sin(frameCount/30));
  //scale(Math.cos(frameCount/60));
  fill("#42002B")
  for (var i = 0; i < grid.hexes.length; i++)
  {
    scale(Math.sin(frameCount/60));
    
    grid.drawHex(grid.hexes[i]);
    
  }
  pop();
}
