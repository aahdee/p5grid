//a point on the coord
// TODO: a base grid.
function Point(x, y) {
  return { x: x, y: y };
}

//constructor
//the var s is calculated from q and r. s HAS to be -q-r. do not forget this.
//swapping r and s isnt a typo. for the xyz coord grid, q=x, r=z, s=y.
function Hex(q, r, s) {
  if (Math.round(q + r + s) !== 0) throw "q, r, s doesnt add to 0";
  return { q: q, r: r, s: s };
}

//start of orentation
//f is the forward matrix. b is inverse.
//hexOrientation
function hexOrientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
  return {
    f0: f0,
    f1: f1,
    f2: f2,
    f3: f3,
    b0: b0,
    b1: b1,
    b2: b2,
    b3: b3,
    start_angle: start_angle,
  };
}

//adapted from redblobgames
const pointyOrient = hexOrientation(
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
const flatOrient = hexOrientation(
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

//validation
function isHex(hex) {
  return hex.q + hex.r + hex.s == 0;
}

function hexToString(hex) {
  if (!isHex(hex)) throw `Input ${hex} is not a valid hex`;
  return `(${hex.q.toString()}, ${hex.r.toString()}, ${hex.s.toString()})`;
}

//get hex coordinates
//becomes hexGetCoord()
function hexGetCoord(hex) {
  if (!isHex(hex)) throw `Input ${hex} is not a valid hex`;
  return [hex.q, hex.r, hex.s];
}
//equality
//becomes hexIsEquals
function hexIsEquals(hexA, hexB) {
  if (!isHex(hexA)) throw `Input ${hexA} is not a valid hex`;
  if (!isHex(hexB)) throw `Input ${hexB} is not a valid hex`;
  return hexA.q == hexB.q && hexA.r == hexB.r && hexA.s == hexB.s;
}

//coor arithmetic
function hexAdd(hexA, hexB) {
  if (!isHex(hexA)) throw `Input ${hexA} is not a valid hex`;
  if (!isHex(hexB)) throw `Input ${hexB} is not a valid hex`;
  return Hex(hexA.q + hexB.q, hexA.r + hexB.r, hexA.s + hexB.s);
}

function hexSub(hexA, hexB) {
  if (!isHex(hexA)) throw `Input ${hexA} is not a valid hex`;
  if (!isHex(hexB)) throw `Input ${hexB} is not a valid hex`;
  return Hex(hexA.q - hexB.q, hexA.r - hexB.r, hexA.s - hexB.s);
}

function hexMult(hex, k) {
  if (!isHex(hex)) throw `Input ${hex} is not a valid hex`;
  return Hex(hex.q * k, hex.r * k, hex.s * k);
}

//essentially the unit vectors of the hex grid
/*var hexDirs = [Hex(1,0,-1), Hex(1,-1,0), Hex(0,-1,1), Hex(-1,0,1), Hex(-1,1,0), Hex(0,1,-1)];
//get neighbor
function hexDir(dir)
{
  if(!(0 <= dir && dir <= 5)) throw "dir is out of range";
  return hexDirs[dir];
}*/
//becomes hexGetNeighbor
function hexGetNeighbor(hex, dir) {
  if (!isHex(hex)) throw "Input is not a valid hex";
  var hexDirs = [
    Hex(1, 0, -1),
    Hex(1, -1, 0),
    Hex(0, -1, 1),
    Hex(-1, 0, 1),
    Hex(-1, 1, 0),
    Hex(0, 1, -1),
  ];
  var hexDir = (dir) => {
    if (!(0 <= dir && dir <= 5)) throw "dir is out of range";
    return hexDirs[dir];
  };

  return hexAdd(hex, hexDir(dir));
}

//get specific hexagons
//becomes hexGetRing
function hexGetRing(hex, radius) {
  if (!isHex(hex)) throw "Input is not a valid hex";
  var hexDirs = [
    Hex(1, 0, -1),
    Hex(1, -1, 0),
    Hex(0, -1, 1),
    Hex(-1, 0, 1),
    Hex(-1, 1, 0),
    Hex(0, 1, -1),
  ];
  var hexDir = function (dir) {
    if (!(0 <= dir && dir <= 5)) throw "dir is out of range";
    return hexDirs[dir];
  };

  var results = [];
  if (radius == 0) {
    results.push(hex);
  } else {
    var start = hexAdd(hex, hexMult(hexDir(4), radius));
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < radius; j++) {
        if (includesHex(start, radius)) results.push(start);
        start = hexGetNeighbor(start, i);
      }
    }
  }
  return results;
}

//diagonals
//if you followed the line that a hex's vertex is the end of,
//what is the hex that is at the other end of the line?
//theres 6, 0 is the north hex (pointy orient) or top right (flat orient)
//goes clockwise

//becoems hexGetDiagonal
function hexGetDiagonal(hex, dir) {
  if (!isHex(hex)) throw "Input is not a valid hex";
  var hexDiags = [
    Hex(1, 1, -2),
    Hex(2, -1, -1),
    Hex(1, -2, 1),
    Hex(-1, -1, 2),
    Hex(-2, 1, 1),
    Hex(-1, 2, -1),
  ];
  var hexGetUnitDiag = function (dir) {
    if (!(0 <= dir && dir <= 5)) throw "diag index out of range";
    return hexDiags[dir];
  };

  return hexAdd(hex, hexGetUnitDiag(dir));
}

//rotate
//this is a 60 degree clockwise rotate around zero. default is one step
//a rotate is negate all coords, shift to the right
//as of 8/15/2019, this is at the center only and by one step
//later can have rotate a hex around another hex.

//becomes hexGetRotate
function hexGetRotate(hex, degrees = 60, origin = Hex(0, 0, 0)) {
  if (!isHex(hex)) throw "Input is not a valid hex";
  if (degrees % 60 != 0) {
    throw "degree is not divisible by 60";
    return;
  }
  let switchCase = (Math.abs(degrees) / 60) % 6;
  if (degrees < 0) switchCase = 6 - switchCase;
  let tempHex = hex;
  let hq, hr, hs, tempCoord;

  let coord = hexGetCoord(tempHex);
  let oriCoord = hexGetCoord(origin);
  hq = coord[0] - oriCoord[0];
  hs = coord[1] - oriCoord[1];
  hr = coord[2] - oriCoord[2];

  switch (switchCase) {
    case 0:
      return hexMult(hex, 1); //to get new instance
    case 1:
      tempCoord = hq;
      hq = hr;
      hr = hs;
      hs = tempCoord;
      return hexAdd(hexMult(Hex(hq, hs, hr), -1), origin);
    case 2:
      tempCoord = hq;
      hq = hs;
      hs = hr;
      hr = tempCoord;
      return Hex(hq, hs, hr);
    case 3:
      return hexMult(hex, -1);
    case 4:
      tempCoord = hq;
      hq = hr;
      hr = hs;
      hs = tempCoord;
      return Hex(hq, hs, hr);
    case 5:
      tempCoord = hq;
      hq = hs;
      hs = hr;
      hr = tempCoord;
      return hexMult(Hex(hq, hs, hr), -1);
  }

  return Hex(hq, hs, hr);
}

//returns the intersecrtions of two hex areas.
function hexOverlap(hexA, hexB, radiusA, radiusB, boardRadius) {
  if (!isHex(hexA)) throw `Input ${hexA} is not a valid hex`;
  if (!isHex(hexB)) throw `Input ${hexB} is not a valid hex`;
  var hexesA = hexArea(hexA, radiusA, boardRadius);
  var hexesB = hexArea(hexB, radiusB, boardRadius);
  var intersection = [];
  for (var i = 0; i < hexesA.length; i++) {
    for (var j = 0; j < hexesB.length; j++) {
      if (hexIsEquals(hexesA[i], hexesB[j])) {
        intersection.push(hexesA[i]);
        break;
      }
    }
  }
  return intersection;
}

//returns an array of hexes that are a certain radius from a hex
//its not the exact hex on the board.
//if its off the board it doesnt draw it.
function hexArea(hex, radius, boardRadius) {
  if (!isHex(hex)) throw `Input ${hex} is not a valid hex`;
  let ctr = Hex(0, 0, 0);
  let result = [];
  let offset, offsetq, offsetr, rStart, rEnd, h;
  offset = hexGetCoord(hex);

  offsetq = offset[0]; //0
  offsetr = offset[1]; //-1
  for (let q = -radius + offsetq; q <= radius + offsetq; q++) {
    let r1 = Math.max(-radius, -q - radius + offsetq) + offsetr;
    let r2 = Math.min(radius, -q + radius + offsetq) + offsetr;
    rStart = Math.min(r1, r2);
    rEnd = Math.max(r1, r2);
    for (let r = rStart; r <= rEnd; r++) {
      h = Hex(q, r, -q - r);
      if (hexInRadius(h, ctr, boardRadius)) {
        result.push(h);
      }
    }
  }
  return result;
}

//for checking if a hex is in the grid or not.
//if any coord is large that r or smaller than -r, its not in the grid.
//could i just pass in the board lol
function includesHex(hex, radius) {
  if (!isHex(hex)) throw `Input ${hex} is not a valid hex`;
  if (
    Math.abs(hex.q) <= radius &&
    Math.abs(hex.r) <= radius &&
    Math.abs(hex.s) <= radius
  )
    return true;
  return false;
}

//an includesHex for when the radius doesnt start from the center.
//becoems hexInRadius
function hexInRadius(hex, ctr, radius) {
  return includesHex(hexSub(hex, ctr), radius);
}

//get a specific hexagon object in the board
//if not in return null
function getHex(array, hex, radius) {
  if (!includesHex(hex, raidus)) return null;
  for (var i = 0; i < array.length; i++) {
    if (hexIsEquals(hex, array[i])) {
      return array[i];
    }
  }
  throw "you shouldn't be here - getHex";
}

//to convert between the grid and the screen
function hexLayout(orientaion, size, radius) {
  //orientaion, point, integer
  return { orientaion: orientaion, size: size, radius: radius };
}

//ensures that the center will stay in the center when the window size is changed.
function hexResizeLayout(layout, nSize) {
  layout.size = nSize;
}

//connecting p5js with this lib. use f matrix
function hex2Screen(layout, hex) {
  //layout, hex
  var ori = layout.orientaion;
  var size = layout.size;
  var o = Point(0, 0);
  var x = (ori.f0 * hex.q + ori.f1 * hex.s) * size.x;
  var y = (ori.f2 * hex.q + ori.f3 * hex.s) * size.y;
  return Point(x + o.x, y + o.y);
}

//use b matrix
function screen2Hex(layout, pixel) {
  //layout, point
  var ori = layout.orientation;
  var size = layout.size;
  var o = Point(0, 0);
  var pt = Point((p.x - o.x) / size.x, (p.y - o.y) / size.y);
  var q = ori.b0 * pt.x + ori.b1 * pt.y;
  var r = ori.b2 * pt.x + ori.b3 * pt.y;
  return Hex(q, -q - r, r);
}

function hexDistance(hexa, hexb) {
  return Math.max(
    Math.abs(hexa.q - hexb.q),
    Math.abs(hexa.r - hexb.r),
    Math.abs(hexa.s - hexb.s)
  );
}

//becomes hexGetCorners
//I was going to make it private but some people might find this useful...
function hexGetCorners(layout, hex) {
  //where they are on the screen.
  var corners = [];
  var center = hex2Screen(layout, hex);
  var hexCorner = function (layout, corner) {
    var size = layout.size;
    var ori = layout.orientaion;
    var angle = (2.0 * Math.PI * (ori.start_angle + corner)) / 6;
    return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  };
  for (var i = 0; i < 6; i++) {
    var corner = hexCorner(layout, i);
    corners.push(Point(center.x + corner.x, center.y + corner.y));
  }
  return corners;
}

//get specific hexagons

//draw the hex from corners, uses p5
//becomes hexDraw
function hexDraw(layout, hex) {
  //layout, hex
  var corners = hexGetCorners(layout, hex);
  beginShape();
  for (var i = 0; i < 6; i++) {
    var pt = corners[i];
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}

//becomes hexDrawArray
function hexDrawArray(layout, hexes) {
  for (var i = 0; i < hexes.length; i++) {
    hexDraw(layout, hexes[i]);
  }
}

//board generation

//creates a board based on an inputted radius
//returns an array of hexes.
//if raduis is 0 it returns just the origin hexagon.
// TODO: mauybe generate in a spiral such that the first is hex(0,0,0)?
//hexGenerateBoard

function hexGenerateBoard(radius, hexes, offset = Hex(0, 0, 0)) {
  var off, offq, offs, offr, r1, r2;
  off = hexGetCoord(offset);
  offq = off[0];
  offs = off[1];
  offr = off[2];
  for (var q = -radius + offq; q <= radius + offq; q++) {
    r1 = Math.max(-radius, -q - radius + offq) + offr;
    r2 = Math.min(radius, -q + radius + offq) + offr;
    for (var r = r1; r <= r2; r++) {
      hexes.push(Hex(q, -q - r, r));
    }
  }
}

//clear the board and array and fill it with a new one.
//hexResetBoard
function hexResetBoard(hexes, newRadius) {
  hexes.length = 0;
  hexGenerateBoard(newRadius, hexes);
}

//a debug mode. takes hexes and the layout.
//displays the coordinates in (x,y,z) format.
//might change the coords displayed based on ease of use and consistency
//hexDebugGrid
function hexDebugGrid(layout, hexes) {
  var currHex, x, y;
  textAlign(CENTER);
  textSize(7);
  for (var i = 0; i < hexes.length; i++) {
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
