# Triangle Grids
In my research into triangle grid coordinate systems, I have discovered a few implementations that are nice but not quite right. I want to make beautiful generative patterns on my screen with different grids, and this requires me to be able to index into a triangle grid and preform basic operations like addition and subtraction. I am just an amateur mathemetican, so I may not know the correct terminology needed to descibe my requirments, so bear with me.

In tesselations, there is a terminology called the *dual*. According to [Wolfram Mathworld](https://mathworld.wolfram.com/DualTessellation.html), the *dual* of a tesselation "is formed by taking the center of each polygon as a vertex and joining the centers of adjacent polygons. 

![](/documentation/trigrid_photos/wolfram.svg)

The dual of a hexagon tessalation is a triangle tesselation, and the dual of a triangle tesselation is a hexagon tessalation. A square tessalation's dual is itself. 
Seeing that the two tesselations are related to each other (they are in the same [tessalation family](https://en.wikipedia.org/wiki/List_of_Euclidean_uniform_tilings#The_[6,3]_group_family)) and they both have three axis of direction, I decided to see if I port use the hexagonal tiling method to triangles.

Current implementations of triagle grids can fall into two categories: those whos coordinate system lables a triangle and those whos coordinate system lables a triangle's vertex. Let's call this *face origin* and *vertex origin* respectively, since the former has an origin at the face, and the latter has an origin at the vertex. My first encounter of the vertex origin method was [Triangle Grids by Newgas](https://www.boristhebrave.com/2021/05/23/triangle-grids/). 

![](/documentation/trigrid_photos/boris.svg)

It was nice but I was not a fan of the vertex origin implementation. I recalled that the existence of the zeroth hexagon was great for addition and subtraction. So I decided to not pay attention in my graphics lecture and came up with this: 

![](/documentation/trigrid_photos/attempt1.png)
![](/documentation/trigrid_photos/attempt2.png)

Here, you are able to check if a coordinate lies on a valid triangle if the coordinates sum to 0 or 1. The sum of the coordinates will also give you information of the triangle's orientation -- if the sum is 0, it has the same orientation as the origin triangle and if the sum is 1, it has the flipped orientation of the origin triangle. 

After this, I came across a research paper titled [A Continuous Coordinate System for the Plane by Triangular Symmetry (Nagy and Abuhmaidan)](https://www.mdpi.com/2073-8994/11/2/191) which defined a vertex origin coordinate system and [Shortest Paths in Triangular Grids with Neighbourhood Sequences (Nagy)](https://www.researchgate.net/publication/47397245_Shortest_Paths_in_Triangular_Grids_with_Neighbourhood_Sequences) which references the same face origin coordinate system that I thought of in lecture. Oh well. 

In my very novice opinion, neither implementation is wrong, but it seems like the vertex origin implemetation has more basis in formal mathematics as most of the implementations I've seen are vertex origin. However, since I wish to make patterns within the cells of the triange grid, I will go forth with the face origin method.  