# Changelog for p5grid

### 8/15/2019
- Added test cases for `isEqualsHex`, `hexAdd`, `hexSub`, `hexMult`, `getDiagonal`, and `getRotate`.
- `includesHex` is constant time.
- `includesHex` and `getHex` args are swapped for consistency.

### 8/16/2019
- Added a debug mode. The debug mode shows the coordinates of the grid and which hexes are on the q, r, and s axis on the cube coordinate system.
- Test case for `isHex` added.
- Fixed a bug where `generateBoard` wouldn't properly create a hex grid when the center passed in as an arg wasn't the origin.
- `hexArea` is complete and tested.
- `hexOverlap` is complete and tested.
- Fixed an issue where I forgot to swap the args of a use of `includesHex` in `inRadius`.
- `push()` and `pop()` are now built into `drawHex()`.

## 8/17/2019
- Accidentally left a dev version of `hexOverlap` in master. It is now changed.
- Started reference of `hexgrid.js`.
