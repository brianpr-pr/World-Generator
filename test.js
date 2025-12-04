function getRegularExpressionLiteral(option){
	switch(option){
		case 'MinimumOneNumber':
			return /^[0-9]+$/;
		case 'onlyNumbersBiggerThanCero':
			return /^[1-9][0-9]*$/;
	}
}

function validate(){
	if(getRegularExpressionLiteral('MinimumOneNumber').test('0')){
		console.log('Correct');
	}else{
		console.log('Incorrect');
	}
}

console.log(validate());
