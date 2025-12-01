// Max number of squares: 3274
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const worldGeneratorForm = document.getElementById('world-generator-form');
    const button = document.getElementById('generator');
	const form = document.getElementById('world-generator-form');

	form.addEventListener('submit', function(event){
		event.preventDefault();
		generateMap();
		paintSquares();
	});
});

//Work on algorithm to paint squares
function generateMap(){
    for(let i = 1, n = 0; i <= 4096; i++){
        let squareDiv = document.createElement('div');
        squareDiv.id = i;
	//squareDiv.classList.add('square');
        canvas.appendChild(squareDiv);
    }
}

function paintSquares(){
	const startSquare = 2018;
	let actualSquare = startSquare;
	let movements = ['top', 'right', 'left', 'bottom'];
	let numberOfSquaresPainted = 0;

	while(numberOfSquaresPainted  < 3274){
		//We generate a random move to access the array of movements
		

		switch(movements[Math.floor(Math.random() * 7)]){
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




const validateForm = () => { 
    [...world-generator-form.querySelectorAll('div')].forEach(divContainerZone => {
        validateZoneContainer(divContainerZone);
    });
}

function validateMapInput(mapSize, mapPorcentageOccupied){

}

/*
function validateZoneContainer(divContainerZone){
    console.log(divContainerZone);
}*/
