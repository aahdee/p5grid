//p5.grid rework
// to update the library with p5 standards before expanding

//hidden...might change the name if i only use it to represent the width and height of the 
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
//d


//size of individual hexagon
//if both parameters are equal, then the length of the side of the hexagon is equal to the parameters
p5.prototype.hexSize = function(x,y){
    return new Point(x,y);
}
p5.prototype.isPoint = function(p){
    if (p == undefined || p.x ==undefined || p.y == undefined ) return false
    return (typeof(p.x) == number && typeof(p.y) == number)
}

//Hex class and its properties and operations. 
p5.prototype.Hex = class{
    constructor(q,r,s){
        if (Math.round(q + r + s) != 0) throw `q = ${q}, r = ${r}, s = ${s}, does not equal zero.`;
        this.q = q;
        this.r = r;
        this.s = s;
    }
    toString() {
        return `(${this.q.toString()}, ${this.r.toString()}, ${this.s.toString()})`;
    }
    getCoordinate() {
        return [this.q, this.r, this.s];
    }
    isEquals(hex2) {
        if (!isHex(hex2)) throw "Object passed into isEquals parameter is not a hexagon";
        return (this.q == hex2.q && this.r == hex2.r && this.s == hex2.s);
    }
    add(hex2){
        if (!isHex(hex2)) throw "Object passed into add parameter is not a hexagon";
        return new Hex(this.q + hex2.q, this.r + hex2.r, this.s + hex2.s);
    }
    subtract(hex2){
        if (!isHex(hex2)) throw "Object passed into subtract parameter is not a hexagon";
        return new Hex(this.q - hex2.q, this.r - hex2.r, this.s - hex2.s);
    }
    multiply(m){
        return new Hex(this.q * m, this.r * m, this.s * m);
    }
    getNeighbor(dir){
        if (!(0 <= dir && dir <= 5)) throw "Direction passed into getNeighbor parameter is out of range";
        return this.add(unitVectorHexagons[dir]);
    }
    getRing(grid,radius){
        let results = []
        if (radius == 0){
            results.push(this);
        }
        else{
            let h = this.add(unitVectorHexagons[4].multiply(radius));
            for(let i = 0; i < 6; i++){
                for (let j = 0; j < radius; j++){
                    if(grid.isHexOnBoard(h)) results.push(h);
                    h = h.getNeighbor(i);
                }
            }
        }
        return results;
    }
   
}
p5.prototype.unitVectorHexagons = [
    new p5.prototype.Hex(1, 0, -1),
    new p5.prototype.Hex(1, -1, 0),
    new p5.prototype.Hex(0, -1, 1),
    new p5.prototype.Hex(-1, 0, 1),
    new p5.prototype.Hex(-1, 1, 0),
    new p5.prototype.Hex(0, 1, -1),
  ];

//Hex operations
p5.prototype.isHex = function(hex) {
    if(hex == undefined || hex.q == undefined || hex.r == undefined || hex.s == undefined ) return false;
    return hex.q + hex.r + hex.s == 0;
}




function hexOrientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.startAngle = start_angle;
}

p5.prototype.HEXPOINTYORIENTATION = new hexOrientation(
    Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0,
    Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0,
    -0.5
) 

p5.prototype.HEXFLATORIENTATION = new hexOrientation(
    3.0/2.0, 0.0, Math.sqrt(3.0)/2.0, Math.sqrt(3.0), 
    2.0/3.0, 0.0, -1.0/3.0, Math.sqrt(3.0)/3.0,
    0.0
)

p5.prototype.HexBoard = class{
    constructor (orientaion, hexSize, boardRadius, origin = new Point(0,0)){
        this.orientaion = orientaion;
        this.hexSize = hexSize;
        this.boardRadius = boardRadius;
        this.origin = origin;
        this.hexes = [];
        this.generateBoard();
        
    }
    generateBoard(){
        //clear the existing array in case one is regenerating with new params
        this.hexes.length = 0;
        
        let r1, r2;
        let rad = this.boardRadius;
        for (let q = -rad; q <= rad; q++ ){
            r1 = Math.max(-rad, -q - rad);
            r2 = Math.min(rad, -q + rad);
            for (let r = r1; r <= r2; r++){
                this.hexes.push(new Hex(-q-r, r,q));
            }
        }
    }
    isHexOnBoard(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon in isHexOnBoard"
        
        return (
            Math.abs(hex.q) <= this.boardRadius &&
            Math.abs(hex.r) <= this.boardRadius &&
            Math.abs(hex.s) <= this.boardRadius
          );
    }
    getCornersOfHex(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon in getCornersOfHex"
        let corners = [];
        let center = this.hexToScreen(hex);
        let size = this.hexSize;
        let orientationAngle = this.orientaion.startAngle;
        for (let i = 0; i < 6; i++){
            let angle = (2.0 * Math.PI * (orientationAngle + i)) / 6;
            let corner =  new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
            corners.push(new Point(center.x + corner.x, center.y + corner.y));
        }
        return corners; //at pointy, 0 is top right. at flat, 0 is right. continues clockwise
    }

    hexToScreen(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon in hexToScreen"
        let x = (this.orientaion.f0 * hex.q + this.orientaion.f1 * hex.s) * this.hexSize.x;
        let y = (this.orientaion.f2 * hex.q + this.orientaion.f3 * hex.s) * this.hexSize.y;
        return new Point(x + this.origin.x, y + this.origin.y);
    }
    getOriginHex(){
        let index = floor(this.hexes.length/2)
        return this.hexes[index]
    }
    drawHex(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon in drawHex"
        let corners = this.getCornersOfHex(hex);
        beginShape();
        for (let i = 0; i < 6; i++){
            let pt = corners[i];
            vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
        
    }
    drawBoard(){
        for(let i = 0; i < this.hexes.length; i++){
            this.drawHex(this.hexes[i]);
        }
    }
    drawBoardDebug(){
        let currHex, x, y;
        textAlign(CENTER);
        textSize(7);
        for (let i = 0; i < this.hexes.length; i++) {
            currHex = this.hexes[i];
            let point = this.hexToScreen(currHex);
            x = point.x;
            y = point.y;
            fill(0, 255, 0);
            if (currHex.q == currHex.s && currHex.s == currHex.r && currHex.r == 0) {
            //the origin of the map
            text("(q, r, s)", x, y);
            continue;
            }
            text(currHex.toString(), x, y);
            fill(150, 0, 150);
            if (currHex.q == 0) text("q axis", x, y + 15);
            else if (currHex.r == 0) text("r axis", x, y + 15);
            else if (currHex.s == 0) text("s axis", x, y + 15);
        }
    }
}


//hexgenerateboard can instead return the hexes array 

//current project flow: 
/*
determin size 
declalre hexes array
determine layout 
layout can have multiple boards, but shifted to one board for each layout. 
generate the board and fill out hexes array, assigning coords
hex2screen gets the centers of tthe hexes on the board
hexgetcorners grabs the corners of the hex from a center point given from hex2screen
hexdraw draws the hexagons from hexgetcorners. 

*/
// issues with current project flow
/*
so far the hexes and the layouts are not explictly connected.
what if someone tries to draw hexes *not* made for that layoyut. 
    this can get convoluted when theres many - see example 5 

*/

//revised structure
/*
a board has a layout and an array of all of the hexes possible
to create a board, give a board radius, size of hexes, an orientation, and location of origin (defaults to 0,0)
board object saves radius, hex size, orientation, and hexes and propeties. 

*/



//------ TRIANGLES -----
p5.prototype.triSize = function(x,y){
    return new Point(x,y);
}

p5.prototype.Triangle = class{
    constructor(q,r,s){
        //need to make it -1 or 1 depending on orientation
        if ( (Math.round(q + r + s) != 1 ) && (Math.round(q + r + s) != 0 ) && (Math.round(q + r + s) != -1 )) throw `q = ${q}, r = ${r}, s = ${s}, does not equal zero or 1 (it is ${Math.round(q + r + s) }).`;
        this.q = q;
        this.r = r;
        this.s = s;
    }
    toString() {
        return `(${this.q.toString()}, ${this.r.toString()}, ${this.s.toString()})`;
    }
    isIsometricToOrigin(){
        return Math.round(this.q + this.r + this.s) == 0;
    }
}

p5.prototype.isTri = function(tri) {
    if(tri == undefined || tri.q == undefined || tri.r == undefined || tri.s == undefined ) return false;
    return tri.q + tri.r + tri.s == 0 || tri.q + tri.r + tri.s == -1 ;
}

p5.prototype.unitVectorTrianglesIsoOrigin= [
    new p5.prototype.Triangle(1, 0, 0),
    new p5.prototype.Triangle(0, 1, 0),
    new p5.prototype.Triangle(0, 0, 1),
  ];
p5.prototype.unitVectorTrianglesAnIsoOrigin= [
    new p5.prototype.Triangle(-1, 0, 0),
    new p5.prototype.Triangle(0, -1, 0),
    new p5.prototype.Triangle(0, 0, -1),
  ];

function triOrientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
    this.f0 = f0;
    this.f1 = f1;
    this.f2 = f2;
    this.f3 = f3;
    this.b0 = b0;
    this.b1 = b1;
    this.b2 = b2;
    this.b3 = b3;
    this.startAngle = start_angle;
}


p5.prototype.TRIPOINTYORIENTATION = new triOrientation(
    Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0,
    Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0,
    0.25
) 
p5.prototype.TRIFLATORIENTATION = new triOrientation(
    Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0,
    Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0,
    0.75
) 

// p5.prototype.TRIFLATORIENTATION = new triOrientation(
//     3.0/2.0, 0.0, Math.sqrt(3.0)/2.0, Math.sqrt(3.0), 
//     2.0/3.0, 0.0, -1.0/3.0, Math.sqrt(3.0)/3.0,
//     0.50
// )

p5.prototype.TriBoard = class{
    constructor (orientaion, triSize, boardRadius, origin = new Point(0,0)){
        this.orientaion = orientaion;
        this.triSize = triSize;
        this.boardRadius = boardRadius;
        this.origin = origin;
        this.tris = [];
        this.generateBoard();
        
    }
    generateBoard(){
        //clear the existing array in case one is regenerating with new params
        this.tris.length = 0;
        //doouble check
        let r1, r2;
        let rad = this.boardRadius;
        for (let q = -rad; q <= rad; q++ ){
            r1 = Math.max(-rad, -q - rad);
            r2 = Math.min(rad, -q + rad);
            for (let r = r1; r <= r2; r++){
                this.tris.push(new Triangle(-q-r, r,q));
                this.tris.push(new Triangle(-q-r, r,q-1));

            }
        }
        // this.tris.push(new Triangle(-1, 0,0));
        // this.tris.push(new Triangle(0, -1,0));
        // this.tris.push(new Triangle(0, 0,-1));


    }
    isTriOnBoard(tri){
        if (!isTri(tri)) throw "paramter is not a valid hexagon in isTriOnBoard"
        
        return (
            Math.abs(tri.q) <= this.boardRadius &&
            Math.abs(tri.r) <= this.boardRadius &&
            Math.abs(tri.s) <= this.boardRadius
          );
    }
    getCornersOfTri(tri){
        if (!isTri(tri)) throw "paramter is not a valid triangle in getCornersOfTri"
        let corners = [];
        let center = this.triToScreen(tri);
        let size = this.triSize;
        if(tri.isIsometricToOrigin()){
            let orientationAngle = this.orientaion.startAngle;
            for (let i = 0; i < 3; i++){
                let angle = (2.0 * Math.PI * (orientationAngle + i)) / 3;
                let corner =  new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
                corners.push(new Point(center.x + corner.x, center.y + corner.y));
            }
        }
        else {
            let orientationAngle =  Math.abs(this.orientaion.startAngle-0.5);
            for (let i = 0; i < 3; i++){
                let angle = (2.0 * Math.PI * (orientationAngle + i)) / 3;
                let corner =  new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
                corners.push(new Point(center.x + corner.x, center.y + corner.y));
            }
        }
        
        return corners; //at pointy, 0 is top right. at flat, 0 is right. continues clockwise
    }

    triToScreen(tri){
        if (!isTri(tri)) throw "paramter is not a valid triangle in triToScreen"
        let x,y;
        if(tri.isIsometricToOrigin()){
            x = (this.orientaion.f0 * tri.q + this.orientaion.f1 * tri.s) * this.triSize.x;
            y = (this.orientaion.f2 * tri.q + this.orientaion.f3 * tri.s) * this.triSize.y;
            return new Point(x + this.origin.x, y + this.origin.y);

        }
        else{
            x = (this.orientaion.f0 * tri.q + this.orientaion.f1 * tri.s) * this.triSize.x;
            y = (this.orientaion.f2 * tri.q + this.orientaion.f3 * tri.s) * this.triSize.y;
            return new Point(x + this.origin.x+this.triSize.x, y + this.origin.y+this.triSize.x*Math.sqrt(3)/3);

        }
        
    }
    getOriginTri(){
        let index = floor(this.tris.length/2)
        return this.tris[index]
    }
    drawTri(tri){
        if (!isTri(tri)) throw "paramter is not a valid triangle in drawTri"
        let corners = this.getCornersOfTri(tri);
        beginShape();
        for (let i = 0; i < 3; i++){
            let pt = corners[i];
            vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
        
    }
    drawBoard(){
        for(let i = 0; i < this.tris.length; i++){
            this.drawTri(this.tris[i]);
        }
    }
    drawBoardDebug(){
        let currTri, x, y;
        textAlign(CENTER);
        textSize(7);
         for (let i = 0; i < this.tris.length; i++) {
            currTri = this.tris[i];
            this.drawTri(currTri);
            let point = this.triToScreen(currTri);
            x = point.x;
            y = point.y;
            fill(0, 255, 0);
            if (currTri.q == currTri.s && currTri.s == currTri.r && currTri.r == 0) {
            //the origin of the map
                text("(q, r, s)", x, y);
                continue;
            }
            text(currTri.toString(), x, y);
            fill(150, 0, 150);
            if (currTri.q == 0) text("q axis", x, y + 15);
            else if (currTri.r == 0) text("r axis", x, y + 15);
            else if (currTri.s == 0) text("s axis", x, y + 15);
        }
    }
}

function hexDebugGrid(layout, hexes) {
  let currHex, x, y;
  textAlign(CENTER);
  textSize(7);
  for (let i = 0; i < hexes.length; i++) {
    currHex = hexes[i];
    var point = hex2Screen(layout, currHex);
    x = point.x;
    y = point.y;
    fill(0, 255, 0);
    if (currHex.q == currHex.s && currHex.s == currHex.r && currHex.r == 0) {
      //the origin of the map
      text("(q, r, s)", x, y);
      continue;
    }
    text(hexToString(currHex), x, y);
    fill(150, 0, 150);
    if (currHex.q == 0) text("q axis", x, y + 15);
    else if (currHex.r == 0) text("r axis", x, y + 15);
    else if (currHex.s == 0) text("s axis", x, y + 15);
  }
}
