var boardRadius = 5;
var hSize = hexSize(45,45);

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
  for(let i = 0; i < grid1.hexes.length; i++){
    push();
    scale(Math.cos(frameCount / random (90, 100)))
    if (i % 2 == 0) fill('#FFFFFF')
    else fill("#000000")
    grid1.drawHex(grid1.hexes[i])
    pop();
  }

  // grid1.drawBoard();
  pop();
}

function keyPressed()
{
  if (keyCode === LEFT_ARROW)
  {
    hSize.x -= 5;
  }
  else if (keyCode === RIGHT_ARROW)
  {
    hSize.x += 5;
  }
  else if (keyCode === UP_ARROW)
  {
    hSize.y += 5;
  }
  else if (keyCode === DOWN_ARROW)
  {
    hSize.y -= 5;
  }
}