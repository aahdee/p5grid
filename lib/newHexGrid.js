//p5.grid rework
// to update the library with p5 standards before expanding

//hidden...might change the name if i only use it to represent the width and height of the
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
//d

//size of individual hexagon
//if both parameters are equal, then the length of the side of the hexagon is equal to the parameters
function hexSize(x, y) {
    return new Point(x, y);
}
function isPoint(p) {
    if (p == undefined || p.x == undefined || p.y == undefined) return false;
    return typeof p.x == number && typeof p.y == number;
}

//Hex class and its properties and operations.
class Hex {
    constructor(q, r, s) {
        if (Math.round(q + r + s) != 0)
            throw `q = ${q}, r = ${r}, s = ${s}, does not equal zero.`;
        this.q = q;
        this.r = r;
        this.s = s;
    }
    toString() {
        return `(${this.q.toString()}, ${this.r.toString()}, ${this.s.toString()})`;
    }
    getCoordinates() {
        return [this.q, this.r, this.s];
    }
    isEquals(hex2) {
        if (!isHex(hex2))
            throw "Object passed into isEquals parameter is not a hexagon";
        return this.q == hex2.q && this.r == hex2.r && this.s == hex2.s;
    }
    add(hex2) {
        if (!isHex(hex2))
            throw "Object passed into add parameter is not a hexagon";
        return new Hex(this.q + hex2.q, this.r + hex2.r, this.s + hex2.s);
    }
    subtract(hex2) {
        if (!isHex(hex2))
            throw "Object passed into subtract parameter is not a hexagon";
        return new Hex(this.q - hex2.q, this.r - hex2.r, this.s - hex2.s);
    }
    multiply(m) {
        return new Hex(this.q * m, this.r * m, this.s * m);
    }
    getNeighbor(dir) {
        if (!(0 <= dir && dir <= 5))
            throw "Direction passed into getNeighbor parameter is out of range";
        return this.add(unitVectorHexagons[dir]);
    }
    getRing(grid, radius) {
        let results = [];
        if (radius == 0) {
            results.push(this);
        } else {
            let h = this.add(unitVectorHexagons[4].multiply(radius));
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < radius; j++) {
                    if (grid.isHexOnBoard(h)) results.push(h);
                    h = h.getNeighbor(i);
                }
            }
        }
        return results;
    }
    //if you followed the line that a hex's vertex is the end of,
    //what is the hex that is at the other end of the line?
    //theres 6, 0 is the north hex (pointy orient) or top right (flat orient)
    //goes clockwise
    getDiagonal(dir) {
        let getUnitDiagonal = (dir) => {
            if (!(0 <= dir && dir <= 5)) throw "diag index out of range";
            return unitDiagonal[dir];
        };
        return this.add(getUnitDiagonal(dir));
    }
    rotate(degrees = 60, origin = new Hex(0, 0, 0)) {
        if (degrees % 60 != 0) {
            throw "hex.rotate: degrees parameter is not divisible by 60";
        }

        let switchCase = (Math.abs(degrees) / 60) % 6;
        //gotta go backwards if its negative!
        if (degrees < 0) switchCase = 6 - switchCase;
        let hq, hr, hs, tempCoord;
        let coordinates = this.getCoordinates();
        let originCoordinates = origin.getCoordinates();
        hq = coordinates[0] - originCoordinates[0];
        hs = coordinates[1] - originCoordinates[1];
        hr = coordinates[2] - originCoordinates[2];

        switch (switchCase) {
            case 0:
                return this.multiply(1); //to get a new instance
            case 1:
                tempCoord = hq;
                hq = hr;
                hr = hs;
                hs = tempCoord;
                return origin.add(new Hex(hq, hs, hr).multiply(-1));
            case 2:
                tempCoord = hq;
                hq = hs;
                hs = hr;
                hr = tempCoord;
                return new Hex(hq, hs, hr);
            case 3:
                return this.multiply(-1);
            case 4:
                tempCoord = hq;
                hq = hr;
                hr = hs;
                hs = tempCoord;
                return new Hex(hq, hs, hr);
            case 5:
                tempCoord = hq;
                hq = hs;
                hs = hr;
                hr = tempCoord;
                return new Hex(hq, hs, hr).multiply(-1);
        }
    }

    //debating allowing hexes that arent on the board to be drawn
    getArea(radius) {
        let result = [];
        let offset, offsetq, offsetr, rStart, rEnd, h;
        offset = this.getCoordinates();

        offsetq = offset[0];
        offsetr = offset[1];

        for (let q = -radius + offsetq; q <= radius + offsetq; q++) {
            let r1 = Math.max(-radius, -q - radius + offsetq) + offsetr;
            let r2 = Math.min(radius, -q + radius + offsetq) + offsetr;
            rStart = Math.min(r1, r2);
            rEnd = Math.max(r1, r2);
            for (let r = rStart; r <= rEnd; r++) {
                h = new Hex(q, r, -q - r);
                //   if (hexInRadius(h, ctr, boardRadius)) {
                // 	result.push(h);
                //   }
                result.push(h);
            }
        }
        return result;
    }
}
let unitDiagonal = [
    new Hex(1, 1, -2),
    new Hex(2, -1, -1),
    new Hex(1, -2, 1),
    new Hex(-1, -1, 2),
    new Hex(-2, 1, 1),
    new Hex(-1, 2, -1),
];
let unitVectorHexagons = [
    new Hex(1, 0, -1),
    new Hex(1, -1, 0),
    new Hex(0, -1, 1),
    new Hex(-1, 0, 1),
    new Hex(-1, 1, 0),
    new Hex(0, 1, -1),
];

//Hex operations
function isHex(hex) {
    if (
        hex == undefined ||
        hex.q == undefined ||
        hex.r == undefined ||
        hex.s == undefined
    )
        return false;
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

const hexPointyOrientation = new hexOrientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    -0.5
);

const hexFlatOrientation = new hexOrientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0
);

class HexBoard {
    constructor(orientaion, hexSize, boardRadius, origin = new Point(0, 0)) {
        this.orientaion = orientaion;
        this.hexSize = hexSize;
        this.boardRadius = boardRadius;
        this.origin = origin;
        this.hexes = [];
        this.generateBoard();
    }
    generateBoard() {
        //clear the existing array in case one is regenerating with new params
        this.hexes.length = 0;

        let r1, r2;
        let rad = this.boardRadius;
        for (let q = -rad; q <= rad; q++) {
            r1 = Math.max(-rad, -q - rad);
            r2 = Math.min(rad, -q + rad);
            for (let r = r1; r <= r2; r++) {
                this.hexes.push(new Hex(-q - r, r, q));
            }
        }
    }
    isHexOnBoard(hex) {
        if (!isHex(hex))
            throw "paramter is not a valid hexagon in isHexOnBoard";

        return (
            Math.abs(hex.q) <= this.boardRadius &&
            Math.abs(hex.r) <= this.boardRadius &&
            Math.abs(hex.s) <= this.boardRadius
        );
    }
    getCornersOfHex(hex) {
        if (!isHex(hex))
            throw "paramter is not a valid hexagon in getCornersOfHex";
        let corners = [];
        let center = this.hexToScreen(hex);
        let size = this.hexSize;
        let orientationAngle = this.orientaion.startAngle;
        for (let i = 0; i < 6; i++) {
            let angle = (2.0 * Math.PI * (orientationAngle + i)) / 6;
            let corner = new Point(
                size.x * Math.cos(angle),
                size.y * Math.sin(angle)
            );
            corners.push(new Point(center.x + corner.x, center.y + corner.y));
        }
        return corners; //at pointy, 0 is top right. at flat, 0 is right. continues clockwise
    }

    hexToScreen(hex) {
        if (!isHex(hex)) throw "paramter is not a valid hexagon in hexToScreen";
        let x =
            (this.orientaion.f0 * hex.q + this.orientaion.f1 * hex.s) *
            this.hexSize.x;
        let y =
            (this.orientaion.f2 * hex.q + this.orientaion.f3 * hex.s) *
            this.hexSize.y;
        return new Point(x + this.origin.x, y + this.origin.y);
    }
    getOriginHex() {
        let index = floor(this.hexes.length / 2);
        return this.hexes[index];
    }
    drawHex(hex, graphic = null) {
        if (!isHex(hex)) throw "paramter is not a valid hexagon in drawHex";
        let corners = this.getCornersOfHex(hex);
        if (graphic) {
            graphic.beginShape();
            for (let i = 0; i < 6; i++) {
                let pt = corners[i];
                graphic.vertex(pt.x, pt.y);
            }
            graphic.endShape(CLOSE);
        } else {
            beginShape();
            for (let i = 0; i < 6; i++) {
                let pt = corners[i];
                vertex(pt.x, pt.y);
            }
            endShape(CLOSE);
        }
    }
    drawBoard(graphic = null) {
        console.log(graphic);
        for (let i = 0; i < this.hexes.length; i++) {
            if (graphic) this.drawHex(this.hexes[i], graphic);
            else this.drawHex(this.hexes[i]);
        }
    }
    //hexoverlap
    intersection(hexA, hexB, radiusA) {}
    //hexarea
}

// function hexAdd(hexA, hexB);

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
