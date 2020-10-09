function Point(x, y) {
  return { x: x, y: y };
}

function Tri(q, r, s) {
  //check validity of params
  //all triangles that have the same orientation as the origin tri has coords that are even. Else, odd.
  //all even coords
  if (q % 2 == 0 && r % 2 == 0 && s % 2 == 0) {
    if (q + r + s == 0) return { q: q, r: r, s: s };
    throw "even coordinates don't checksum to 0";
  }
  //all odd coords
  if (q % 2 != 0 && r % 2 != 0 && s % 2 != 0) {
    if (q + r + s == -1) return { q: q, r: r, s: s };
    throw "odd coordinates don't checksum to -1";
  }
  throw "coordinates aren't all even or all odd";
}
function isTri(tri) {
  //check if all even
  let q = tri.q;
  let r = tri.r;
  let s = tri.s;
  if (q % 2 == 0 && r % 2 == 0 && s % 2 == 0 && q + r + s == 0) return true;
  //check if all odd
  if (q % 2 != 0 && r % 2 != 0 && s % 2 != 0 && q + r + s == -1) return true;
  return false;
}
function isTriCoord(q, r, s) {
  try {
    let t = Tri(q, r, s);
  } catch (e) {
    return false;
  }
  return true;
}
function triGetCoord(tri) {
  if (!isTri(tri)) throw `Input ${tri} is not a valid triangle`;
  return [tri.q, tri.r, tri.s];
}

function triOrientation(f0, f1, f2, f3, b0, b1, b2, b3, start_angle) {
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

const horizontalOrient = triOrientation(
  Math.sqrt(3.0),
  Math.sqrt(3.0) / 2.0,
  0.0,
  3.0 / 2.0,
  Math.sqrt(3.0) / 3.0,
  -1.0 / 3.0,
  0.0,
  2.0 / 3.0,
  0
);
const verticalOrient = triOrientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.25
);
function triLayout(orientation, size, radius) {
  return { orientation: orientation, size: size, radius: radius };
}
function triToScreen(layout, tri) {
  let ori = layout.orientation;
  let size = layout.size;
  //do i need origin????
  let origin = Point(0, 0);
  let x = (ori.f0 * tri.q + ori.f1 * tri.s) * size.x;
  let y = (ori.f2 * tri.q + ori.f3 * tri.s) * size.y;
  return Point(x + origin.x, y + origin.y);
}

function triGetCorners(layout, tri) {
  let corners = [];
  let center = triToScreen(layout, tri);
  let triCorner = function (layout, corner) {
    let size = layout.size;
    let ori = layout.orientation;
    let angle = (2.0 * Math.PI * (ori.start_angle + corner)) / 3;
    return Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  };
  for (let i = 0; i < 3; i++) {
    let corner = triCorner(layout, i);
    corners.push(Point(center.x + corner.x, center.y + corner.y));
  }
  return corners;
}

function triDraw(layout, tri) {
  let corners = triGetCorners(layout, tri);
  beginShape();
  for (let i = 0; i < corners.length; i++) {
    let pt = corners[i];
    vertex(pt.x, pt.y);
  }
  endShape(CLOSE);
}
function triDrawArray(layout, tris) {
  for (let i = 0; i < tris.length; i++) {
    triDraw(layout, tris[i]);
  }
}
function triGenerateBoard(radius, tris, offset = Tri(0, 0, 0)) {
  let off, offq, offs, offr, r1, r2;
  off = triGetCoord(offset);
  offq = off[0];
  offs = off[1];
  offr = off[2];
  for (var q = -radius + offq; q <= radius + offq; q++) {
    r1 = Math.max(-radius, -q - radius + offq) + offr;
    r2 = Math.min(radius, -q + radius + offq) + offr;
    for (var r = r1; r <= r2; r++) {
      if (isTriCoord(q, -q - r, r)) tris.push(Tri(q, -q - r, r));
    }
  }
}
