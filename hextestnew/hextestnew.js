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
    grid1.drawHex(new Hex(-2, 0, 2));
    fill("blue");
    let area = new Hex(-4, 0, 4).getArea(2);
    console.log(area[0]);
    for (h of area) {
        console.log(h);
        grid1.drawHex(h);
    }

    pop();
    //hexDraw(mainLayout, originHex, 0);
}

//function test holder. you can comment the ones you want to see in and vice versa.
