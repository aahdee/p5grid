//p5.grid rework
// to update the library with p5 standards before expanding

//hidden...might change the name if i only use it to represent the width and height of the 
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

//size of individual hexagon
function hexSize(x,y){
    return Point(x,y);
}
function isPoint(p){
    if (p == undefined || p.x ==undefined || p.y == undefined ) return false
    return (typeof(p.x) == number && typeof(p.y) == number)
}

//Hex definition
class Hex{
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
        if (!isHex(hex2)) throw "Object passed into parameter is not a hexagon";
        return this.q == hex2.q && this.r == hex2.r && this.s == hex2.s;
    }
}

function isHex(hex) {
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
    this.start_angle = start_angle;
}

const hexPointyOrientation = new hexOrientation(
    Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0,
    Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0,
    0.5
)

const hexFlatOrientation = new hexOrientation(
    3.0/2.0, 0.0, Math.sqrt(3.0)/2.0, Math.sqrt(3.0), 
    2.0/3.0, 0.0, -1.0/3.0, Math.sqrt(3.0)/3.0,
    0.0
)

class HexBoard{
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
            r2 = Math.max(rad, -q + rad);
            for (let r = r1; r <= r2; r++){
                this.hexes.push(new Hex(q, -q - r,r));
            }
        }
    }
    isHexOnBoard(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon"
    }
    getCornersOfHex(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon"
    }
    hexToScreen(hex){
        if (!isHex(hex)) throw "paramter is not a valid hexagon"
    }
    drawBoard(){}
    

   
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