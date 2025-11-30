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



function generateMap(){
    for(let i = 1; i <= 4096; i++){
        let div = document.createElement('div');
        //div.innerText = 1;
        let classIdentifier = i;
        div.classList.add('square',classIdentifier);
        canvas.appendChild(div); 
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