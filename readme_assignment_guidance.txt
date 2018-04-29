1. The index building class locates at: buildIndex.BuildAll

2. Run the exemplar command: sg.txt index 2 3 9 24 5 10
**sg.txt is the data file

3. You need to implement the function indexBuilding in BuildAll.java to build the two-level inverted index.
**the function locates at line 257-275

4. The index is built successfully if it shows:
building object database and Quadtree...
object database and quad tree build time : 3 second
number of sparse nodes in Quadtree: 3013
number of leaf nodes in Quadtree: 5320
number of level in Quadtree: 11

positional q-gram infrequent ratio : 2930 / 7323
q-gram token infrequent ratio : 8234 / 15078
infrequent inverted index building time : 0 seconds

building node-level and object-level inverted index...
node-level and object-level inverted index build time : 12 seconds

number of sparse nodes in Quadtree: 3013
number of leaf nodes in Quadtree: 5320
number of level in Quadtree: 11
infrequent positional q-gram inverted index size: 2930
first-Level positional q-gram inverted index size: 7323
second-Level positional q-gram inverted index size: 234629
infrequent q-gram token inverted index size: 8234
first-Level q-gram token inverted index size: 16725
second-Level q-gram token inverted index size: 449632


5. You can find the generated index files if your code is right. What you need to do next is to implement the query part based the index.

6. We give the skeleton of 3 main query functions, you need to fill the functions to make the code running again.
**Specifically, the functions locate from line 497 to 653 in QueryEngine.java.
Note that current code can be executed with command over RunQueryLatest.java:
**index query.txt index index 2 3 9 10 5 5 10 0.01 0.0025 2 0
