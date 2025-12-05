'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const worldGeneratorForm = document.getElementById('world-generator-form');
    const button = document.getElementById('generator');
	const form = document.getElementById('world-generator-form');
	const resultMessage = document.getElementById('result-message');
	let isMapGenerated = false;
	form.addEventListener('submit', function(event){
		event.preventDefault();
		canvas.innerHTML = null;		
		validateAllInput(form, resultMessage);
		const sizeOfMap = parseInt(form.querySelector('div').querySelectorAll('input')[0].value) ** 2;
		const porcentageOfMapUsed = parseInt(form.querySelector('div').querySelectorAll('input')[1].value);
		
		const amountSquaresPainted = calculateMap(sizeOfMap, porcentageOfMapUsed);
		console.log('Limit of size that we can paint: ' + amountSquaresPainted);
		let sectionsZoneData = calculateSectionsZonesData(form, amountSquaresPainted);
		console.log('Amount of squares that will actually be painted: ' + calculateTotalSquaresFromSections(sectionsZoneData) );
		//Testing
		//calculateTotalPainted(sectionsZoneData, amountSquaresPainted);

		generateMap(sizeOfMap);
		//correctsectionsZoneData(sectionsZoneData, amountSquaresPainted);
		paintSquares(amountSquaresPainted, sectionsZoneData);
	});
});

function paintSquares(amountSquaresPainted, sectionsZoneData){
	const startingSquare = Math.floor(amountSquaresPainted / 2);
	let zonesAlreadyPainted = 0;
	sectionsZoneData.commerce.forEach( (amountSquaresToPaint) => {
		paintZone('orange', (zonesAlreadyPainted+1), amountSquaresToPaint, startingSquare);
		zonesAlreadyPainted++;
	});

	sectionsZoneData.urban.forEach( (amountSquaresToPaint) => {
		paintZone('yellow', (zonesAlreadyPainted+1), amountSquaresToPaint, startingSquare);
		zonesAlreadyPainted++;
	});

	sectionsZoneData.nature.forEach( (amountSquaresToPaint) => {
		paintZone('green', (zonesAlreadyPainted+1), amountSquaresToPaint, startingSquare);
		zonesAlreadyPainted++;
	});
}

function paintZone(colorOfSquare, zoneNumber, amountSquaresToPaint, startingSquare){
	let actualSquare = startingSquare;
	let movements = ['top', 'right', 'left', 'bottom'];
	let numberOfSquaresPainted = 0;

	while(numberOfSquaresPainted  < amountSquaresToPaint){
		//We generate a random move to access the array of movements
		switch(movements[Math.floor(Math.random() * 4)]){
			case 'top':
				actualSquare -= 64;
				break;

			case 'right':
				actualSquare  += 1;
				break;

			case 'left':
				actualSquare  -= 1;
				break;

			case 'bottom':
				actualSquare  += 64;
				break;
		}

		if(document.getElementById(actualSquare) !== null){
		  if(!document.getElementById(actualSquare).classList.contains('square')){
		   numberOfSquaresPainted++;
		   document.getElementById(actualSquare).classList.add('square');
		   document.getElementById(actualSquare).style.backgroundColor = colorOfSquare;
		   document.getElementById(actualSquare).innerText = zoneNumber;
		  }
		}else{
		  actualSquare = startingSquare;
		}
	}
}

//Work on algorithm to paint squares
//document.documentElement.style.setProperty('--my-color', 'tomato');
function generateMap(sizeOfMap){
    for(let i = 1, n = 0; i <= sizeOfMap; i++){
        let squareDiv = document.createElement('div');
        squareDiv.id = i;
		//squareDiv.classList.add('square');
        canvas.appendChild(squareDiv);
    }
}

function calculateMap(sizeOfMap, porcentageOfMapUsed){
	return Math.round(sizeOfMap * porcentageOfMapUsed / 100);
}

//Validation of input
function validateAllInput(form, resultMessage){
	resultMessage.innerText = null;
	resultMessage.classList.remove('text-danger', 'text-success');

	try{
		let totalSquares = validateMap(form.querySelector('#map-container'));
		let totalMinimumZones = 0;
		form.querySelectorAll('div').forEach( (containerZone, index) => {
			if(index !== 0){
				validateRegion(containerZone);
				totalMinimumZones += parseInt(containerZone.querySelectorAll('input')[0].value);
			}
		});
		
		if(totalMinimumZones > totalSquares){
			throw new Error(`The total amount of all minimum number of zones per region can't be superior to the amount of squares to paint`);
		}

		resultMessage.innerText = 'Map was created successfully';
		resultMessage.classList.add('text-success');
	}catch(e){
		resultMessage.innerText = e;
		resultMessage.classList.add('text-danger');
	}

	return 'Map created successfully.';
}

function calculateSectionsZonesData(form, amountSquaresPainted){
	let sectionsZoneData = {'nature': [], 'urban': [], 'commerce': []};

	form.querySelectorAll('div').forEach((containerZone, index) => {
		if(index !== 0){
			const minimumNumberZones = parseInt(containerZone.querySelectorAll('input')[0].value);
			const maximumNumberZones = parseInt(containerZone.querySelectorAll('input')[1].value);
			let zoneMaximumSize = parseInt(containerZone.querySelectorAll('input')[2].value);
			const totalMaximumSize = parseInt(containerZone.querySelectorAll('input')[3].value);

			const numberOfZones = getRandom(minimumNumberZones, maximumNumberZones);

			//If the possible number is bigger than the setted total limit, we divide by 2 the value of limit size per zone
			/*while((numberOfZones * zoneMaximumSize) > totalMaximumSize){
				zoneMaximumSize = (zoneMaximumSize <= 1) ? 1 : (Math.round(zoneMaximumSize* 0.95 ) );
			}*/

			switch(index){
				case 1:
					sectionsZoneData.nature = generateSizesForZones(numberOfZones, zoneMaximumSize);
					break;

				case 2:
					sectionsZoneData.urban = generateSizesForZones(numberOfZones, zoneMaximumSize);
					break;

				case 3:
					sectionsZoneData.commerce = generateSizesForZones(numberOfZones, zoneMaximumSize);
					break;
			}

			//Algorithm to try to increase the number of squares that will be generated
			/*
			if(calculateTotalSquaresFromSections(sectionsZoneData) < amountSquaresPainted){
				//console.log(calculateTotalSquaresFromSections(sectionsZoneData));
				//console.log(amountSquaresPainted);
				let rest = amountSquaresPainted - calculateTotalSquaresFromSections(sectionsZoneData);

				sectionsZoneData.nature.forEach( zoneSize => {
					if(zoneSize < zoneMaximumSize){
						let sumUntilLimit = zoneMaximumSize - zoneSize;
						if(rest > sumUntilLimit){
							zoneSize += sumUntilLimit;
							rest -= sumUntilLimit;
						}
					}
				});
			}*/
		}

	});

	return sectionsZoneData;
}

function generateSizesForZones(numberOfZones, zoneMaximumSize){
//Creation of the zones sizes of each section
let arrZonesSizes = [];
for(let i = 0; i < numberOfZones; i++){
	arrZonesSizes.push(getRandom(1, zoneMaximumSize));
}
return arrZonesSizes;
}

function validateMap(mapContainer){
	const sizeMapSquares = mapContainer.querySelector('#size-map-squares').value;
	const porcentageMap = mapContainer.querySelector('#porcentage-map').value;

	if(!getRegularExpressionLiteral('onlyNumbersBiggerThanCero').test(sizeMapSquares)){
		throw new Error('Only numbers that are bigger than cero are allowed for the size of the map');
	}

	if(!getRegularExpressionLiteral('MinimumOneNumber').test(porcentageMap)){
		throw new Error('Only numbers are allowed for the porcentage that the map will occupy');
	}

	if(parseInt(porcentageMap) <= 0 
	|| parseInt(porcentageMap) > 100){
		throw new Error('The porcentage have to be a number between 1-100 inclusive');
	}

	// Missing upper limit on how many squares can the web browser get using my algorithm
	if(typeof(mapContainer.querySelector('#size-map-squares').value) !== 'string'){
		throw new Error('Invalid input');
	}
	
	if( document.getElementById('size-map-squares') < 0){
		throw new Error('Size of the map has to be at least 1 square');
	}

	//Return of the number of squares of the map that will be painted 
	return Math.floor((parseInt(sizeMapSquares) ** 2 * parseInt(porcentageMap) / 100));
}

function validateRegion(container){
	const minimumNumberZones = container.querySelectorAll('input')[0].value;
	const maximumNumberZones = container.querySelectorAll('input')[1].value;
	const zoneMaximumSize = container.querySelectorAll('input')[2].value;
	const totalMaximumSize = container.querySelectorAll('input')[3].value;

	if(typeof(minimumNumberZones) !== 'string'){
		throw new Error('Value inserted for "Minimum number zones" is incorrect, only numbers are allowed');
	}

	if(!getRegularExpressionLiteral('onlyNumbersBiggerThanCero').test(minimumNumberZones)){
		throw new Error('The minimum number of zones must be a number bigger than cero');
	}

	if(typeof(maximumNumberZones) !== 'string'){
		throw new Error('Value inserted for "Maximum number zones" is incorrect, only numbers are allowed');
	}

	if(!getRegularExpressionLiteral('onlyNumbersBiggerThanCero').test(maximumNumberZones)){
		throw new Error('The maximum number of zones must be a number bigger than cero');
	}

	if(parseInt(minimumNumberZones) > parseInt(maximumNumberZones)){
		throw new Error(`The minimum number of zones can't be bigger thant the maximum`);
	}

	if(typeof(zoneMaximumSize) !== 'string'){
		throw new Error('Invalid value inserted in field of the maximum size of a zone');
	}

	if(!getRegularExpressionLiteral('onlyNumbersBiggerThanCero').test(zoneMaximumSize)){
		throw new Error('The value for maximum size of a zone must be a number bigger that 0');
	}

	if(typeof(totalMaximumSize) !== 'string'){
		throw new Error('Invalid value inserted in field of the maximum size of a zone');
	}

	if(!getRegularExpressionLiteral('onlyNumbersBiggerThanCero').test(zoneMaximumSize)){
		throw new Error('The value for maximum size of a zone must be a number bigger that 0');
	}

	if(parseInt(minimumNumberZones) > parseInt(totalMaximumSize)){
		throw new Error(`Minimum number of zones can't be bigger than the total maximum size of all zones`);
	}

	if(parseInt(zoneMaximumSize) > parseInt(totalMaximumSize)){
		throw new Error(`Maximum size of a zone can't be bigger than the total size of all zones combined`);
	}
}

//Auxiliar function that returns a regular expression literal
function getRegularExpressionLiteral(option){
	switch(option){
		case 'MinimumOneNumber':
			return /^[0-9]+$/;
		case 'onlyNumbersBiggerThanCero':
			return /^[1-9][0-9]*$/;
	}
}

function getRandom(min, max){
  return Math.round( Math.random() * (max - min) + min );
}

function calculateTotalSquaresFromSections(sectionsZoneData){
	let result = 0;
	sectionsZoneData.nature.forEach( numberOfSquares => {
		result+=numberOfSquares
	});

	sectionsZoneData.urban.forEach( numberOfSquares => {
		result+=numberOfSquares
	});
	
	sectionsZoneData.commerce.forEach( numberOfSquares => {
		result+=numberOfSquares
	});
	return result;
}