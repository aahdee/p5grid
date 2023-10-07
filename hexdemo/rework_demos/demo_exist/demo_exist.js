var boardRadius = 2;
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
  let h = grid1.hexes[14]
  fill('red')
  grid1.drawHex(h)
  let ring = h.getRing(grid1,3)
  fill("blue")
  for (let i = 0; i < ring.length; i++){
    grid1.drawHex(ring[i])
  }
  let center = grid1.getOriginHex()
  fill("purple")
  grid1.drawHex(center)
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