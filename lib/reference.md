# p5grid Reference

This is a *work in progress* reference for my implementation of grids in p5.js. Before continuing, I highly suggest that you read this [hexagonal grid guide](https://www.redblobgames.com/grids/hexagons/) by Red Blob Games. It's what I based my hexagon implementation on and inspired me to create implementations for triangles, squares, and octagons, so it will give you a good understanding of the coordinate systems and how to properly use the library. It's also a beautiful guide so I still urge you to check it out if you're experienced to appreciate their handiwork.


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
### Orientation
There are two orientations for the grid: `pointyOrient` and `flatOrient`. `pointyOrient` is when the hexagons have their vertex pointing up and `flatOrient` is when they have their side pointing up. This is passed into `Layout()` to designate the orientation for the grid.
### Layout()
**Syntax:** `Layout(orientation, size, originPixel)`  
**Requires:** `size` should be a `Pixel` that has positive values. `originPixel` should be `Hex(0,0,0)`  
This creates the an invisible grid where you can place you hexes on. `size` represents the radius (It's slightly larger than it should be, this is a fix in progress). 
### generateBoard()
**Syntax:** `generateBoard(radius, hexes, offset = Hex(0,0,0))`  
**Requires:** `0 <= radius && hexes = []`  
As it implies, this function generates a board with a radius of `radius` and puts the result into the `hexes` array. The center of the board is at the origin hexagon, (0,0,0), by default but it can be changed by adding the optional parameter `offset`. Should be called in `setup()`
### drawHexes() and drawHexesArray()
**Syntax:** `drawHexes(layout, hex, color)`, `drawHexesArray(layout, hexes, color)`  
This draws a singular hexagon or an array of hexagons onto the screen. Color can be in any format you wish. The grid is drawn with its center at `Point(0,0)`, so its advised to use transformations to place it where you wish.

With these you can easily generate a grid in `setup()` and `draw()`. The example used in `hexTest.js` is below.

	var boardRadius = 5; //radius of hex grid
	var size; //size of hexes
	var originHex = Hex(0,0,0); //very center of the board
	var hexes = [];
	var mainLayout;

	function setup()
	{
	  createCanvas(windowWidth, windowHeight);
	  size = Point(10, 10);
	  originPixel = Point(0, 0);
	  mainLayout = Layout(pointyOrient, size, originPixel)
	  generateBoard(boardRadius, hexes, Hex(0,0,0));
	}

	function draw()
	{
	  stroke('#ED8FA5');
	  background(50);
	  fill(100);
	  push();
	  translate(width/2, height/2);
	  drawHexesArray(mainLayout, hexes, '#BE73B2')
	  pop();
	  ellipse(width/2, height/2,10,10);
	}

## Basic Functions

### isHex()
**Syntax:** `isHex(Hex)`  
Takes in a hexagon and returns true if it is a valid hexagon cell on the grid (q + s + r = 0)

The following functions require that the inputs are valid Hexes. There may be additional requirements.

### hexToString()
**Syntax:** `hexToString(Hex)`  
Returns the q, s, in r values in a string formatted as "(q,s,r)"

### getHexCoord()
**Syntax:** `getHexCoord(Hex)`  
Returns the q, s, and r values as an array.

### isEqualsHex()
**Syntax:** `isEqualsHex(Hex, Hex)`  
Returns true if the two arguments share the same coordinates.

### hexAdd()
**Syntax:** `hexAdd(Hex, Hex)`  
Returns the addition of argument's coordinates.

### hexSub()
**Syntax:** `hexSub(Hex, Hex)`  
Returns the subtraction of the argument's coordinates.

### hexMult()
**Syntax:** `hexMult(Hex, k)`  
Returns the multiplication of the passed in Hex and the integer k.

### getHexNeighbor()
**Syntax:** `getHexNeighbor(Hex, direction)`  
**Requires:** `0 <= direction && direction < 6`  
Returns the Hex that shares an edge with the passed in Hex. The argument `direction` is in increments of 60 degrees clockwise with 0 degrees as north.

### getDiagonal()
**Syntax:** `getDiagonal(Hex, direction)`
Returns the Hex whose vertex shares an edge with a passed in Hex's vertex.

### getRing()
**Syntax:** `getRing(Hex, radius)`  
**Requires:** `0 <= radius`  
Returns an array of Hexes that are a distance of radius away from the passed in Hex.

### getRotate()
**Syntax:** `getRotate(Hex, rotateNum = 1)`  
**Requires:** `0 <= rotateNum && rotateNum < 6`
Returns the clockwise rotation around the origin of the passed in Hex. The argument `rotateNum` is in multiples of 60 degrees.



# trigrid.js
Implementation coming soon!

# sqrgrid.js
Implementation coming soon!

# octgrid.js
Implementation coming soon!
