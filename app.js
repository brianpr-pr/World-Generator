// Max number of squares: 3274
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const worldGeneratorForm = document.getElementById('world-generator-form');
    const button = document.getElementById('generator');

    button.addEventListener('click', function() {
        generateMap();
        
        
        //validateForm();
    });
});

//Work on algorithm to paint squares
function generateMap(){
    for(let i = 1; i <= 4096; i++){
        let squareDiv = document.createElement('div');
        squareDiv.id = i;
        if(getRandomInt(2) === 1){
            squareDiv.classList.add('square');
        }
        canvas.appendChild(squareDiv);
    }
}


/*
const validateForm = () => { 
    [...world-generator-form.querySelectorAll('div')].forEach(divContainerZone => {
        validateZoneContainer(divContainerZone);
    });
}

function validateZoneContainer(divContainerZone){
    console.log(divContainerZone);
}*/