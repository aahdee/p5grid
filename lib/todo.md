# To-do
<<<<<<< Updated upstream
- Implementation of transformation of the entire grid and scaling.
- No fill when drawing Hexes such that there can be a wireframe grid.
- Remove originPixel for the transition to `push()` and `pop()` feature
- Edit names of some functions for clarity and quality of life.
- Change arguments names and delete unnecessary arguments.
- Let `getRotate()` rotate a Hex around a Hex that is not the origin.
- fix origin properties. let origin pixel be based on screen.
- distance function
=======

## hexgrid.js
- Implementation of transformation of the entire grid and scaling into a function.
- It's odd that I defined the color of a hex as a parameter in `hexDraw` but defined the stroke outside of the function

- Ensure that the naming conventions fits with p5.js
- Change arguments names, order, and delete unnecessary arguments.
  - edit examples and reference in response to it.
- Creating optimization of functions.
  - `getRotate()` is a possibility because the state that it is in is a literal mess.
- Implement private functions where it's needed.
- There seems to be too many iterations in `debugGrid()`, so I should analyze it for optimization.
- Delete the damn comments.
- Can I improve hexArea by taking out the last two args??
- Remove `originPixel` for the transition to `push()` and `pop()` feature
  - The most likely plan will be that the client can define `originPixel` but the implementation draws the grid at (0,0) and translates to the specified pixel. Thus translations will be centered around the origin hexagon but it still sticks with the p5.js convention of defining the location of graphics at initialization instead of initializing and then translating them to the intended location.
    - There was an attempt. Issues came with calling transformations on the grid because (0,0) was at the top left when they were called. Considering writing special transformation functions for grid, but that will probably add too much burden the user.
      - ~~A possible solution is to not call `push` and `pop` in hexDraw, but have the user call it outside of the function.~~ Doesn't work, because order matters. If translate its in the draw function, then I can't put it last because rotations are not centered, but I can't put it first because the transformations don't apply.
  - It seems to be the easiest to have it such that the translation to the specified origin is done by user because of the aforementioned reasons. `originPixel` will be removed from the implementation in favor of p5's translate.


# Completed
- ~~Let `getRotate()` rotate a Hex around a Hex that is not the origin.~~
- ~~No fill when drawing Hexes such that there can be a wireframe grid.~~
- ~~distance function~~
- ~~Edit names of some functions for clarity and quality of life.~~
  - ~~A `hexFooBar()` format so it can be an easy transition to `triFooBar()` or `sqFooBar()` for other grids.~~
    - ~~`hexgrid.js`~~
    - ~~the hextest folder~~
    - ~~the examples folder~~ I think it's done, will do a looksie.
    - ~~the reference~~
- ~~`hexInRadius()` and `includesHex()` are v similar and can be merged.~~
  - ~~params of the board returned by `hexLayout()` (which technically returns a object so it should be `HexLayout()`) so that can be of assistance.~~
  - I wont merge, but instead `includesHex()` will most likely be hidden.  
>>>>>>> Stashed changes
