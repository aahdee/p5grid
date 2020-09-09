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
