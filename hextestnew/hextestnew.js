var boardRadius = 5; //radius of hex grid
var hSize = hexSize(30, 30);

function setup() {
    createCanvas(windowWidth, windowHeight);
    grid1 = new HexBoard(hexPointyOrientation, hSize, boardRadius);
    angleMode(DEGREES);
    noLoop();
}

function draw() {
    stroke("#ED8FA5");
    background(50);
    fill(100);
    push();
    translate(width / 2, height / 2);
    fill("#BE73B2");
    grid1.drawBoard();
    fill("red");
    grid1.drawHex(new Hex(0, 0, 0));
    fill("blue");
    grid1.drawHex(new Hex(0, 0, 0).getDiagonal(2));
    pop();
    //hexDraw(mainLayout, originHex, 0);
}

//function test holder. you can comment the ones you want to see in and vice versa.
