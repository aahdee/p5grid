//a point on the coord
// TODO: a base grid.
function Point (x, y)
{
  return{x: x, y: y};
}

//constructor
//the var s is calculated from q and r. s HAS to be -q-r. do not forget this.
//swapping r and s isnt a typo. for the xyz coord grid, q=x, r=z, s=y.
function Hex(q, r, s)
{
  if (Math.round(q + r + s) !== 0) throw "q, r, s doesnt add to 0";
  return {q : q, s: s, r: r};
}

//start of orentation
//f is the forward matrix. b is inverse.
function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle)
{
  return {f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle};
}

const pointyOrient = Orientation(Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0, Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0, -0.5);
const flatOrient = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

//validation
function isHex(hex)
{
  return(hex.q + hex.r + hex.s == 0);
}

//// TODO: fix or delete.
function hexToString(hex)
{
    if (!isHex(hex)) throw "Input is not a valid hex";
    return "("+hex.q.toString()+", "+hex.r.toString()+", "+hex.s.toString()+")";
}
//get hex coordinates
function getHexCoord(hex)
{
  if(!isHex(hex)) throw "Input is not a valid hex"
  return [hex.q, hex.r, hex.s];
}
//equality
function isEqualsHex(hexa, hexb)
{
  if(!isHex(hex)) throw "Input is not a valid hex"
  return (hexa.q == hexb.q && hexa.r == hexb.r && hexa.s == hexb.s);
}

//coor arithmetic
function hexAdd(a, b)
{
  if(!isHex(hex)) throw "Input is not a valid hex"
  return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
}
function hexSub(a, b)
{
  if(!isHex(hex)) throw "Input is not a valid hex"
  return Hex(a.q - b.q, a.r - b.r, a.s - b.s);
}
function hexMult(a, k)
{
  if(!isHex(hex)) throw "Input is not a valid hex"
  return Hex(a.q * k, a.r * k, a.s * k);
}



//essentially the unit vectors of the hex grid
var hexDirs = [Hex(1,0,-1), Hex(1,-1,0), Hex(0,-1,1), Hex(-1,0,1), Hex(-1,1,0), Hex(0,1,-1)];
//get neighbor
function hexDir(dir)
{
  if(!(0 <= dir && dir <= 5)) throw "dir is out of range";
  return hexDirs[dir];
}
function getHexNeighbor(a, dir)
{
  return hexAdd(a, hexDirs(dir));
}

//get specific hexagons
//todo: fix
function getRing(hex, radius)
{
  var results = [];
  if (radius == 0)
  {
    results.push(hex);
  }
  else
  {
    var start = hexAdd(hex,hexMult(hexDir(4),radius));
    for (var i = 0; i < 6; i++)
    {
      for (var j = 0; j < radius; j++)
      {
        if (includesHex(start, radius)) results.push(start);
        start = getHexNeighbor(start, i);
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
var hexDiags = [Hex(1,1,-2), Hex(2,-1,-1), Hex(1,-2,1), Hex(-1,-1,2), Hex(-2,1,1), Hex(-1,2,-1)];

function getHexUnitDiag(index)
{
  if(!(0 <= index && index <= 5)) throw "diag index out of range";
  return hexDiags[index];
}

function getDiagonal(hex, dir)
{
  return hexAdd(hex, getHexUnitDiag(dir));
}

//rotate
//this is a 60 degree clockwise rotate around zero. default is one step
//a rotate is negate all coords, shift to the right
//as of 8/15/2019, this is at the center only and by one step
//later can have rotate a hex around another hex.

function getRotate(hex, rotateNum = 1)
{
  var tempHex = hex;
  var hq, hr, hs, tempCoord;
  var negate = 1;
  var coord = getHexCoord(tempHex);
  hq = coord[0];
  hs = coord[1];
  hr = coord[2];

  switch (rotateNum) {
    case 0:
      return hexMult(hex,1); //to get new instance
    case 1:
      tempCoord = hq;
      hq = hr;
      hr = hs;
      hs = tempCoord;
      return hexMult(Hex(hq,hs,hr),-1);
    case 2:
      tempCoord = hq;
      hq = hs;
      hs = hr;
      hr = tempCoord;
      return Hex(hq,hs,hr);
    case 3:
      return hexMult(hex, -1);
    case 4:
      tempCoord = hq;
      hq = hr;
      hr = hs;
      hs = tempCoord;
      return Hex(hq,hs,hr);
    case 5:
      tempCoord = hq;
      hq = hs;
      hs = hr;
      hr = tempCoord;
      return hexMult(Hex(hq,hs,hr),-1);
      break;
    default:

  }

  /*if (rotateNum % 2 == 0) rotateNum /= 2;
  else
  {
    rotateNum = Math.floor(rotateNum/2) + 1;
    negate = -1;
  }
  var coord = getHexCoord(tempHex);
  hq = negate * coord[0];
  hs = negate * coord[1];
  hr = negate * coord[2];

  for (var i = 0; i < rotateNum; i++)
  {

    if (negate == -1)
    {
      tempCoord = hq;
      hq = hr;
      hr = hs;
      hs = tempCoord;
    }
    else
    {
      tempCoord = hs;
      hs = hr;
      hr = hq;
      hq = tempCoord;
    }
  }*/
  return Hex(hq,hs,hr)
}


function hexOverlap(hexA, hexB, radiusA, radiusB, ctr, boardRadius)
{
  var hexesA = hexArea(hexA, radiusA, ctr, boardRadius);
  var hexesB = hexArea(hexB, radiusB, ctr, boardRadius);
  var intersection = [];
  for (var i = 0; i < hexesA.length; i++)
  {
    for(var j = 0; j < hexesB.length; j++)
    {
      if (isEqualsHex(hexesA[i],hexesB[j]))
      {
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
function hexArea(hex, radius, ctr, boardRadius)
{
  var result = [];
  var off, offq, offs, offr, r1, r2, h;
  off = getHexCoord(hex);

  offq = off[0];
  offs = off[1];
  offr = off[2];
  for(var q = -radius+offq; q <= radius+offq; q++)
  {
    r1 = Math.max(-radius, -q - radius+offq)+offr;
    r2 = Math.min(radius, -q + radius+offq)+offr;
    for(var r = r1; r <= r2; r++)
    {
      h = Hex(q,-q-r,r);
      if (inRadius(h, ctr, boardRadius)) result.push(h);
    }
  }
  return result;
}


//uhh redundant
/*checks if the hexes has the same coordinates
function isEqualsHex(hexa, hexb)
{
  return (hexa.q == hexb.q) && (hexa.r == hexb.r) && (hexa.s == hexb.s);
}*/

//for checking if a hex is in the grid or not.
//if any coord is large that r or smaller than -r, its not in the grid.
function includesHex(hex, radius)
{
  if ((Math.abs(hex.q) <= radius) && (Math.abs(hex.r) <= radius) && (Math.abs(hex.s) <= radius)) return true;
  return false;
}

//an includesHex for when the radius doesnt start from the center.
function inRadius(hex, ctr, radius)
{
  return(includesHex(hexSub(hex,ctr),radius));
}

//get a specific hexagon object in the board
//if not in return null
function getHex(array, hex, radius)
{
  if (!includesHex(hex, raidus)) return null;
  for (var i = 0; i < array.length; i++)
  {
    if (isEqualsHex(hex, array[i])) {return array[i];}
  }
  throw "you shouldn't be here - getHex";
}


//to convert between the grid and the screen
function Layout(orientaion, size, origin) //orientaion, point, point
{
  return{orientaion: orientaion, size: size, origin: origin};
}

//ensures that the center will stay in the center when the window size is changed.
function resizeLayout(layout, nSize, nOrigin)
{
  layout.size = nSize;
  layout.origin = nOrigin;
}

//connecting p5js with this lib. use f matrix
function hex2Screen(layout, hex) //layout, hex
{
  var ori = layout.orientaion;
  var size = layout.size;
  var o = layout.origin;
  var x = (ori.f0 * hex.q + ori.f1*hex.s) * size.x;
  var y = (ori.f2 * hex.q + ori.f3*hex.s) * size.y;
  return Point(x + o.x, y + o.y);
}

//use b matrix
function screen2Hex(layout, pixel) //layout, point
{
  var ori = layout.orientation;
  var size = layout.size;
  var o = layout.origin;
  var pt = Point((p.x - o.x)/size.x, (p.y - o.y)/size.y);
  var q = ori.b0 * pt.x + ori.b1 *pt.y;
  var r = ori.b2 * pt.x + ori.b3 * pt.y;
  return Hex(q, -q-r, r);
}

//creating the points for the corners of the hexagon
function hexCorner(layout, corner) //layout, int
{
  var size = layout.size;
  var ori = layout.orientaion;
  var angle = 2.0 * Math.PI * (ori.start_angle + corner) / 6;
  return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}
function getCorners(layout, hex) //where they are on the screen.
{
  var corners= [];
  var center = hex2Screen(layout, hex);
  for (var i = 0; i < 6; i++)
  {
    var corner = hexCorner(layout, i);
    corners.push(Point(center.x + corner.x, center.y + corner.y));
  }
  return corners;
}

//get specific hexagons

//draw the hex from corners, uses p5
function drawHex(layout, hex, color) //layout, hex
{
  var corners = getCorners(layout, hex);
  fill(color);
  push();
  //translate(width/2, height/2);
  beginShape();
  for (var i = 0; i < 6; i++)
  {
    var pt = corners[i];
    //vertex(pt.x , pt.y)
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
  pop();
}

function drawHexesArray(layout, hexes, color)
{

  for(var i = 0; i < hexes.length; i++)
  {
    drawHex(layout, hexes[i], color);
  }
}

//board generation

//creates a board based on an inputted radius
//returns an array of hexes.
//if raduis is 0 it returns just the origin hexagon.
// TODO: mauybe generate in a spiral such that the first is hex(0,0,0)?
function generateBoard(radius, hexes, offset = Hex(0,0,0))
{
  var off, offq, offs, offr, r1, r2;
  off = getHexCoord(offset);
  offq = off[0];
  offs = off[1];
  offr = off[2];
  for(var q = -radius+offq; q <= radius+offq; q++)
  {
    r1 = Math.max(-radius, -q - radius+offq)+offr;
    r2 = Math.min(radius, -q + radius+offq)+offr;
    for(var r = r1; r <= r2; r++)
    {
      hexes.push(Hex(q,-q-r,r));
    }
  }
}

//clear the board and array and fill it with a new one.
function resetBoard(hexes, newRadius)
{
  hexes.length = 0;
  generateBoard(newRadius, hexes);
}

//a debug mode. takes hexes and the layout.
//displays the coordinates in (x,y,z) format.
//might change the coords displayed based on ease of use and consistency
function debugGrid(layout, hexes)
{
  var currHex, x, y;
  textAlign(CENTER);
  textSize(15);
  for (var i = 0; i < hexes.length; i++)
  {
    currHex = hexes[i];
    var point = hex2Screen(layout, currHex);
    x = point.x;
    y = point.y;
    fill(0,255,0);
    if (currHex.q == currHex.s && currHex.s == currHex.r && currHex.r == 0) //the origin of the map
    {
      text("(q, s, r)", x,y);
      continue;
    }
    text(hexToString(currHex), x,y);
    fill(150,0,150);
    if (currHex.q == 0) text("q axis", x,y+15);
    else if (currHex.s == 0) text("r axis", x,y+15);
    else if (currHex.r == 0) text("s axis", x,y+15);
  }
}
