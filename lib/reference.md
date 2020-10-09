# p5grid Reference

This is a _work in progress_ reference for my implementation of grids in p5.js. Before continuing, I highly suggest that you read this [hexagonal grid guide](https://www.redblobgames.com/grids/hexagons/) by Red Blob Games. It's what I based my hexagon implementation on and inspired me to create implementations for triangles, squares, and octagons, so it will give you a good understanding of the coordinate systems and how to properly use the library. It's also a beautiful guide so I still urge you to check it out if you're experienced to appreciate their handiwork.

# hexgrid.js

## Foundations

There are a few foundations of the grid that you should know about. They're key to building a basic grid.

### Point()

**Syntax:** `Point(x, y)`  
This represents a pixel on the screen. It works exactly like how you would usually define a point. I'll be referring to points on the screen as `Point(x, y)` in this guide to avoid confusion.

### Hex()

**Syntax:** `Hex(q, s, r)`  
**Requires:** `q + s + r == 0`  
This constructor creates a hexagon with the coordinates q, s, and r on the hexagonal grid. It is best to decided what q and r is and then calculate s as -q-r.

### hexOrientation

There are two orientations for the grid: `pointyOrient` and `flatOrient`. `pointyOrient` is when the hexagons have their vertex pointing up and `flatOrient` is when they have their side pointing up. This is passed into `hexLayout()` to designate the orientation for the grid.

### hexLayout()

**Syntax:** `hexLayout(orientation, size, radius)`  
**Requires:** `size` should be a `Pixel` that has positive integers. ~~`originPixel` should be a `Pixel` that can have postive or negative integers.~~
~~This creates the an invisible grid where you can place you hexes on at the point `originPixel` relative to your screen. To be specific, the board is drawn at (0,0) and then translated to the location specified at `originPixel`. `size` represents the radius (It's slightly larger than it should be, this is a fix in progress).~~  
The `originPixel` variable is being phased out. There may be references to it later ,

### hexGenerateBoard()

**Syntax:** `hexGenerateBoard(radius, hexes, offset = Hex(0,0,0))`  
**Requires:** `0 <= radius && hexes = []`  
As it implies, this function generates a board with a radius of `radius` and puts the result into the `hexes` array. The center of the board is at the origin hexagon, (0,0,0), by default but it can be changed by adding the optional parameter `offset`. Should be called in `setup()`

### hexDraw() and hexDrawArray()

**Syntax:** `hexDraw(layout, hex)`, `hexDrawArray(layout, hexes)`  
This draws a singular hexagon or an array of hexagons onto the screen. The grid is drawn with its center at `Point(0,0)`, so its advised to use transformations to place it where you wish.

With these you can easily generate a grid in `setup()` and `draw()`. The example used in `hexTest.js` is below.

    var boardRadius = 5; //radius of hex grid
    var size; //size of hexes
    var originHex = Hex(0,0,0); //very center of the board
    var hexes = [];
    var mainLayout;

    function setup()
    {
      createCanvas(windowWidth, windowHeight);
      background(50);
      size = Point(10, 10);
      originPixel = Point(0, 0);
      mainLayout = hexLayout(pointyOrient, size)
      hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
    }

    function draw()
    {
      stroke('#ED8FA5');
      background(50);
      push();
      translate(width/2, height/2);
      hexDrawArray(mainLayout, hexes, '#BE73B2')
      pop();
    }

## Basic Functions

### isHex()

**Syntax:** `isHex(Hex)`  
Takes in a hexagon and returns true if it is a valid hexagon cell on the grid (q + s + r = 0)

The following functions require that the inputs are valid Hexes. There may be additional requirements.

### hexToString()

**Syntax:** `hexToString(Hex)`  
Returns the q, s, in r values in a string formatted as "(q,s,r)"

### hexGetCoord()

**Syntax:** `hexGetCoord(Hex)`  
Returns the q, s, and r values as an array.

### hexIsEquals()

**Syntax:** `hexIsEquals(Hex, Hex)`  
Returns true if the two arguments share the same coordinates.

### includesHex()

**Syntax:** `includesHex(Hex, radius)`  
**Requires:** `radius = boardRadius`  
Returns true if the given hexagon is in the board.

### hexInRadius()

**Syntax:** `hexInRadius(Hex, ctr, radius)`
**Requires:** `0 <= radius`  
Returns true if the given hexagon is in the area defined by hexagon `ctr` and `radius`. I understand that this can easily be folded into the previous function, but that can only happen if I modify the foundation which can be a pain.

### hexAdd()

**Syntax:** `hexAdd(Hex, Hex)`  
Returns the addition of argument's coordinates.

### hexSub()

**Syntax:** `hexSub(Hex, Hex)`  
Returns the subtraction of the argument's coordinates.

### hexMult()

**Syntax:** `hexMult(Hex, k)`  
Returns the multiplication of the passed in Hex and the integer k.

### hexGetNeighbor()

**Syntax:** `hexGetNeighbor(Hex, direction)`  
**Requires:** `0 <= direction && direction < 6`  
Returns the Hex that shares an edge with the passed in Hex. The argument `direction` is in increments of 60 degrees clockwise with 0 degrees as north.

### hexGetDiagonal()

**Syntax:** `hexGetDiagonal(Hex, direction)`
Returns the Hex whose vertex shares an edge with a passed in Hex's vertex.

### hexGetRing()

**Syntax:** `hexGetRing(Hex, radius)`  
**Requires:** `0 <= radius`  
Returns an array of Hexes that are a distance of radius away from the passed in Hex.

### hexGetRotate()

**Syntax:** `hexGetRotate(Hex, degrees = 60, origin = Hex(0,0,0))`  
**Requires:** `degrees % 60 == 0 `

Returns the Hex that is a rotation of `degrees` of the passed in Hex around the origin. A positive value for `degrees` is a clockwise rotation and a negative value is a counter-clockwise rotation.

### hexArea()

**Syntax:** `hexArea(Hex, radius, layout)`  
**Requires:** `0 <= radius`  
Returns an array of all hexagons within a given radius of a given hexagon. `layout` is the layout parameters of the board.

### hexOverlap()

**Syntax:** `hexOverlap(HexA, HexB, radiusA, radiusB, boardRadius)`  
**Requires:** `0 <= radiusA && 0 <= radiusB && 0 <= boardRadius`  
Returns an array of the intersection between two areas where one area has a center of `HexA` and a radius of `radiusA` and the other area has a center of `HexB` and a radius of `radiusB`. `boardRadius` is the radius of the board.

### hexDebugGrid()

**Syntax:** `hexDebugGrid(hexes, layout)`  
The debug mode! Currently all it does is label each cell with its coordinates. If you have suggestions, please mention it to me via my twitter @aah(underscore)dee(underscore)

# trigrid.js

Implementation coming soon!

# sqrgrid.js

Implementation coming soon!

# octgrid.js

Implementation coming soon!
