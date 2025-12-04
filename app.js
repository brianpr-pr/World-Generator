'use strict';
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const worldGeneratorForm = document.getElementById('world-generator-form');
    const button = document.getElementById('generator');
	const form = document.getElementById('world-generator-form');
	const resultMessage = document.getElementById('result-message');

	form.addEventListener('submit', function(event){
		event.preventDefault();
		
		validateAllInput(form, resultMessage);
		
		/*
		generateMap();
		paintSquares();
		*/
	});
});

//Validation of input
function validateAllInput(form, resultMessage){
	resultMessage.innerText = null;
	resultMessage.classList.remove('text-danger', 'text-success');

	try{
		validateMap(form.querySelector('#map-container'));
		form.querySelectorAll('div').forEach( (containerZone) => {
			console.log(containerZone);
		});

		resultMessage.innerText = 'Map was created successfully';
		resultMessage.classList.add('text-success');
	}catch(e){
		console.log(e)
		resultMessage.innerText = e;
		resultMessage.classList.add('text-danger');
	}

	return 'Map created successfully.';
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

//Work on algorithm to paint squares
//document.documentElement.style.setProperty('--my-color', 'tomato');
function generateMap(){
    for(let i = 1, n = 0; i <= 4096; i++){
        let squareDiv = document.createElement('div');
        squareDiv.id = i;
	//squareDiv.classList.add('square');
        canvas.appendChild(squareDiv);
    }
}

function paintSquares(){
	const startSquare = 2048;
	let actualSquare = startSquare;
	let movements = ['top', 'right', 'left', 'bottom'];
	let numberOfSquaresPainted = 0;

	while(numberOfSquaresPainted  < 3274){
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

		//Algorithm needs improvement to be able to paint the 3274 squares that are necessary.
		if(document.getElementById(actualSquare) !== null){
		  if(!document.getElementById(actualSquare).classList.contains('square')){
		   console.log('Painting square');
		   numberOfSquaresPainted++;
		   document.getElementById(actualSquare).classList.add('square');
		  }
		}else{
		  actualSquare = startSquare;
		  console.log('Square doesnt exist');
		}

		console.log(numberOfSquaresPainted);
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