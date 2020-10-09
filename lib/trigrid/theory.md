# trigrid.js

## Tiling Theory

- There are two possible orientations for the grid, Horizontal (H) and Vertical (V). In Horizontal, an axis is horizontal. In Vertical, an axis is Vertical. They are 30 degree rotations from each other.
- Origin triangle on H will have a point facing north. Origin triangle on V will have a point facing east.
  - Could have a south and west orientation, but at that point the grid could be rotated 180 degrees. Deliberating on that fact.
- For each grid orientation, there are two possible orientations for each triangle. The origin will have one of these triangle orientations.
- All triangles that have the same orientation as the origin triangle has coordinates that are even. Else, odd.
- Checksum is the sum of all of the coordinates.
- If a triangle has the same triangle orientation as the origin triangle, then its checksum must each 0. Else, -1.
  - Two odds cant sum to an even number, so the checksum that was used for hexagons is invalid on alt orientation tris.
- It seems as if triangles that are the same triangle orientation as the origin, it will have only even coordinates. Else, they will have only odd coordinates.
  - Therefore,
    - a triangle must have only even or only odd coordinates. Else, it is invalid.
    - if a triangle has even coordinates, the checksum must be 0. Else, it is invalid.
    - if a triangle has odd coordinates, the checksum must be -1. Else it is invalid.

_To properly define the tenets:_

- **Two grid orientations: Horizontal and Vertical.**
- **Two triangle orientations per grid orientation: Up and Down for Horizontal, Left and Right for Vertical.**
- **Origin triangle (0,0,0) will always point north for Horizontal and always point right for Vertical.**
- **A triangle that has the same triangle orientation as the origin triangle will have only even coordinates. If it doesn't have the same orientation as the origin triangle, it will have only odd coordinates.**
- **A triangle must have only even or only odd coordinates. Else, it is invalid.**
- **If a triangle has even coordinates, the checksum must be 0. Else, it is invalid.**
- **If a triangle has odd coordinates, the checksum must be -1. Else it is invalid.**
