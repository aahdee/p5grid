let boardRadius = 4;
let hSize;
let tSize;

function setup()
{
  createCanvas(windowWidth, windowHeight);
  hSize = new hexSize(30,30);
  tSize = new triSize(30,20);
  background(25);
  angleMode(DEGREES);
  grid1 = new HexBoard(HEXPOINTYORIENTATION, hSize, boardRadius);
  grid2 = new TriBoard(TRIFLATORIENTATION, tSize, boardRadius);

}

function draw()
{
  stroke('#A45287');
  background(50);
  push();
  translate(width/2, height/2);
  fill("#42002b");
  // noFill()
  // grid1.drawBoard();
  grid2.drawBoardDebug();
  for(let i = 0; i < grid2.tris.length; i++){
    let tri = grid2.tris[i];
    

    // if (tri.q == 0 && tri.r == 0 && tri.s == 0){
    //   // hex.draw
    //   push();
    //   fill("red");
    //   circle(grid2.triToScreen(tri).x,grid2.triToScreen(tri).y,10);
    //   pop();
    // }
    // else{
    //   circle(grid2.triToScreen(tri).x,grid2.triToScreen(tri).y,10)
    // }
  }

  // let h = grid1.hexes[14]
  // fill('red')
  // grid1.drawHex(h)
  // let ring = h.getRing(grid1,3)
  // fill("blue")
  // for (let i = 0; i < ring.length; i++){
  //   grid1.drawHex(ring[i])
  // }
  // let center = grid1.getOriginHex()
  // fill("purple")
  // grid1.drawHex(center)
  pop();
}

function keyPressed()
{
  // if (keyCode === LEFT_ARROW)
  // {
  //   hSize.x -= 5;
  // }
  // else if (keyCode === RIGHT_ARROW)
  // {
  //   hSize.x += 5;
  // }
  // else if (keyCode === UP_ARROW)
  // {
  //   hSize.y += 5;
  // }
  // else if (keyCode === DOWN_ARROW)
  // {
  //   hSize.y -= 5;
  // }
}