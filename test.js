function calculateMap(sizeOfMap, porcentageOfMapUsed){
	return (sizeOfMap * porcentageOfMapUsed / 100);
}
console.log(calculateMap(1000,5));