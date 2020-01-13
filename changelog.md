# Changelog for p5grid

## 1/13/2019
- push date
- naming conventions have changed, so previous code written with past versions will not work with this one.
- examples are not updated yet. 
- see changelog for full notes
- hello those from the p5.js zine!!

## 1/7/2019
- changed params in `hexArea()`. ctr and boardRadius is the center hex (Hex(0,0,0)) and layout.radius

## 12/29/2019
- It's been quite sometime.
- Edited documentation to suit the new naming standard.

## 9/5/2019
- Fixed the naming standard to `hexFooBar()` for simplicity.

## 8/29/2019
- The changelog is now in reverse chronological order. One shouldn't have to scroll to the bottom to see new updates.
- Implemented rotation around a non origin hex.
- Hex grids can now have no fill color.
- Hid information in `getDiagonal`, `getCorners`, `getHexNeighbor`.

## 8/19/2019
- Added demos and examples.
- Added examples to the readme.

## 8/17/2019
- Accidentally left a dev version of `hexOverlap` in master. It is now changed.
- Started reference of `hexgrid.js`.
- Fixed assertion errors in `isEqualsHex`, `hexAdd`, `hexSub`, `hexMult`.

## 8/16/2019
- Added a debug mode. The debug mode shows the coordinates of the grid and which hexes are on the q, r, and s axis on the cube coordinate system.
- Test case for `isHex` added.
- Fixed a bug where `generateBoard` wouldn't properly create a hex grid when the center passed in as an arg wasn't the origin.
- `hexArea` is complete and tested.
- `hexOverlap` is complete and tested.
- Fixed an issue where I forgot to swap the args of a use of `includesHex` in `inRadius`.
- `push()` and `pop()` are now built into `drawHex()`.

<<<<<<< Updated upstream
## 8/17/2019
- Accidentally left a dev version of `hexOverlap` in master. It is now changed.
- Started reference of `hexgrid.js`.
- Fixed assertion errors in `isEqualsHex`, `hexAdd`, `hexSub`, `hexMult`.

## 8/19/2019
- Added demos and examples.
- Added examples to the readme.
=======
## 8/15/2019
- Added test cases for `isEqualsHex`, `hexAdd`, `hexSub`, `hexMult`, `getDiagonal`, and `getRotate`.
- `includesHex` is constant time.
- `includesHex` and `getHex` args are swapped for consistency.
>>>>>>> Stashed changes
