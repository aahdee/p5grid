//p5.grid rework
// to update the library with p5 standards before expanding

//hidden
function Point(x,y){
    this.x = x;
    this.y = y;
}

//size of hexagons
function hexSize(x,y){
    return Point(x,y);
}

function Hex(q, r, s){
    if (Math.round(q + r + s) != 0) throw `q = ${q}, r = ${r}, s = ${s}, does not equal zero.`;
    this.q = q;
    this.r = r;
    this.s = s;
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

const pointyOrientation = new hexOrientation(
    Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0,
    Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0,
    0.5
)

const flatOrientation = new hexOrientation(
    3.0/2.0, 0.0, Math.sqrt(3.0)/2.0, Math.sqrt(3.0), 
    2.0/3.0, 0.0, -1.0/3.0, Math.sqrt(3.0)/3.0,
    0.0
)

function Layout(orientaion, size, origin = new Point(0,0)){
    this.orientaion = orientaion;
    this.size = size;
    this.origin = origin;
}

//hexgenerateboard can instead return the hexes array 

//project flow: 
