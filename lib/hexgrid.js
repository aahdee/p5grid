//*** to create ****//
/*
  define the point size,
*/

//a point on the coord
//prolly dont need, i can use p5js
function Point (x, y)
{
  return{x: x, y: y};
}

//constructorr
function Hex(q, r, s)
{
  if (Math.round(q + r + s) !== 0) throw "q, r, s doesnt add to 0";
  return {q : q, r: r, s: s};
}

//get hex coordinates
function getHexCoord(hex)
{
  return [hex.q, hex.r, hex.s];
}
//equality
function isEqualsHex(hexa, hexb)
{
  return (hexa.q == hexb.q && hexa.r == hexb.r && hexa.s == hexb.s);
}


//coor arithmetic
function hexAdd(a, b)
{
  return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
}
function hexSub(a, b)
{
  return Hex(a.q - b.q, a.r - b.r, a.s - b.s);
}
function hexMult(a, k)
{
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
function getRing(center, radius, radius)
{
  var results = [];
  if (radius == 0)
  {
    results.push(center);
  }
  else
  {
    var start = hexAdd(center,hexMult(hexDir(4),radius));
    for (var i = 0; i < 6; i++)
    {
      for (var j = 0; j < radius; j++)
      {
        if (includesHex(radius, start)) results.push(start);
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

function hexDiag(diag)
{
  if(!(0 <= diag && diag <= 5)) throw "diag index out of range";
  return hexDiags[diag];
}

function getDiagonal(hex, diag)
{
  return hexAdd(hex, hexDiag(diag));
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
  if (rotateNum % 2 == 0) rotateNum /= 2;
  else
  {
    (rotateNum /= 2) +1;
    negate = -1;
  }
  var coord = getHexCoord(tempHex);
  hq = negate * coord[0];
  hr = negate * coord[1];
  hs = negate * coord[2];

  for (var i = 0; i < rotateNum; i++)
  {

    if (negate == -1)
    {
      tempCoord = hq;
      hq = hs;
      hs = hr;
      hr = tempCoord;
    }
    else if (negate == 1)
    {
      tempCoord = hr;
      hr = hs;
      hs = hq;
      hq = tempCoord;
    }
    else throw "aren you absolute dumbass. err in getRotate";
  }
}




//uhh redundant
/*checks if the hexes has the same coordinates
function isEqualsHex(hexa, hexb)
{
  return (hexa.q == hexb.q) && (hexa.r == hexb.r) && (hexa.s == hexb.s);
}*/

//checks if the hex is in an array
//this isnt constant, thus it goes in the trash
/*function includesHex(array, hex, startIndex = 0)
{
  for (var i = startIndex; i < array.length; i++)
  {
    if (isEqualsHex(hex, array[i])) {return true;}
  }
  return false;
}*/

//if any coord is large that r or smaller than -r, its not in the grid.
function includesHex(radius, hex)
{
  if ((-radius <= hex.q && hex.q <= radius) && (-radius <= hex.r && hex.r <= radius) && (-radius <= hex.s && hex.s <= radius)) return true;
  return false;
}
//instance of hex in array
//tbh idk why this would be needed but here we are.
//if not in return null
function getHex(array, hex, radius)
{
  if (!includesHex(radius, hex)) return null;
  for (var i = 0; i < array.length; i++)
  {
    if (isEqualsHex(hex, array[i])) {return array[i];}
  }
  throw "aren you fucked up. err in getHex or includesHex";
}


//start of orentation
//f is the forward matrix. b is inverse.
function Orientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle)
{
  return {f0: f0, f1: f1, f2: f2, f3: f3, b0: b0, b1: b1, b2: b2, b3: b3, start_angle: start_angle};
}

//im only using pointy so might as well only put that in.
var pointyOrient = Orientation(Math.sqrt(3.0), Math.sqrt(3.0)/2.0, 0.0, 3.0/2.0, Math.sqrt(3.0)/3.0, -1.0/3.0, 0.0, 2.0/3.0, 0.5);
var flatOrient = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);

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
  var x = (ori.f0 * hex.q + ori.f1*hex.r) * size.x;
  var y = (ori.f2 * hex.q + ori.f3*hex.r) * size.y;
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
  return Hex(q, r, -q -r);
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
  beginShape();
  for (var i = 0; i < 6; i++)
  {
    var pt = corners[i];
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}

//board generation

//creates a board based on an inputted radius
//returns an array of hexes.
//if raduis is 0 it returns just the origin hexagon.
// TODO: mauybe generate in a spiral such that the first is hex(0,0,0)?
function generateBoard(radius, hexes)
{
  for(var q = -radius; q <= radius; q++)
  {
    var r1 = Math.max(-radius, -q - radius);
    var r2 = Math.min(radius, -q + radius);
    for(var r = r1; r <= r2; r++)
    {
      hexes.push(Hex(q,r,-q-r));
    }
  }
}



function resetBoard(hexes, newRadius)
{
  hexes.length = 0;
  generateBoard(newRadius);
}
