Add input for amount of squares and porcentage of squares that should be part of the map and 
create the map dinamically, this has to still be responsive...

Add to the algorithm the option of creating a square in the top right/left or bottom right/left position

Add to the algorithm that for each new painted square it will assign a number corresponding to a zone and a color from the three categories (nature, urban, commerce).

Modify the borders of the painted squares so they will only have a border if its not facing a painted squares, so the border will be around the whole map rather that each small square with the 4 borders. 

Algorithm to generate the number of zones for each section:

For each container:


1. Generation of n zones, being n a number larger or equal than the minimum stablished by the user and smaller or equal than the maximum number of zones.

2. Establishment of amount of squares for each zone, we first validate that the product of the factors:
zones generated and maximum size of zones is smaller or equal than the maximum total size of all zones of a section, in case this product is bigger with the help of the ternary operator we either assign 1 or half rounded to a whole number and we check again if the new number is able to pass the condition, in case the product is smaller or equal we generate a random number that is in the range of 1 to Maximum-Size-Zone.

3. Once we have the number of zones and the size of each zone for each section of the map, we will calculate if this number is smaller or equal than the porcentage of the total amount of squares that the map will have, in case is not, we
iterate each section (Starting from nature, urban, commerce) deleting the zone with the largest number of squares (In case it has more than one section), Once the number of total squares to paint for each section is smaller or equal than the total, we execute the paint squars algorithm, painting and assigning a number from commerce to urban, nature, and once the number of squares of commerce are painted, it will start with the next section.