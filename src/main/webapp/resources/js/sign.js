const status = $('meta[name="status"]').attr('content') || '00'; // 회원가입 00, 가입 성공 01/실패 02

var keyCanvas = tagCon('canvas', {'id': 'keyCanvas'}, {'height': '100%'});
var ctx = keyCanvas[0].getContext('2d');
var canvasWidth = keyCanvas[0].width;
var canvasHeight = keyCanvas[0].height;
var formPropOk = [false, [false, false], [false, false]];
var formTag = $("form");

const drawKey = {
	midDot: [canvasWidth/3, canvasHeight/2],
	radius: 30,
	startDraw: Math.PI * 0.1,
	endDraw: Math.PI * 1.9,
	keyWidth: (canvasWidth*2)/3 + 30,
	heightInterval: (30 * Math.sin(Math.PI * 0.1)),
	keyTeeth: [20, 10],
	draw: function(prop) {
		ctx.beginPath();
		ctx.arc(this.midDot[0], this.midDot[1], this.radius, this.startDraw, this.endDraw, false);
		ctx.lineTo(this.keyWidth, this.midDot[1] - this.heightInterval);
		ctx.lineTo(this.keyWidth, this.midDot[1] + this.heightInterval + this.keyTeeth[1]);	
		ctx.lineTo(this.keyWidth - this.keyTeeth[0], this.midDot[1] + this.heightInterval + this.keyTeeth[1]);
		ctx.lineTo(this.keyWidth - this.keyTeeth[0], this.midDot[1] + this.heightInterval);
		ctx.lineTo(this.midDot[0] + (this.radius * Math.sin(0.4 * Math.PI)) - 5, this.midDot[1] + this.heightInterval);
		ctx.lineWidth = 10;
		if(prop.lineColor) {
			ctx.strokeStyle = prop.lineColor;
			ctx.stroke();
		}else if(prop.fillColor) {
			ctx.fillStyle = prop.fillColor;
			ctx.fill();
		}else {
			ctx.stroke();
		}
		ctx.closePath();
	}
		
}
const drawLine = (thisCanvas, prop) => {
		var midDot = [thisCanvas.width/2, thisCanvas.height/2];
		var thisCtx = thisCanvas.getContext('2d');
		var startDot = prop.startHeight =='top'? 0 : thisCanvas.height;
		var lastDot = thisCanvas.width * (prop.lastWidth == 'right'? 2 : 1) / 3;
		
		thisCtx.beginPath();
		thisCtx.moveTo(midDot[0], startDot);
		thisCtx.lineTo(midDot[0], midDot[1]);
		thisCtx.lineTo(lastDot, startDot == 0? thisCanvas.height : 0);
		thisCtx.lineWidth = 20;
		if(prop.lineColor) {
			thisCtx.strokeStyle = prop.lineColor;
			thisCtx.stroke();			
		} else {
			thisCtx.stroke();			
		}
}

function lineCanvas(position = ['top', 'right']) {
	var thisCanvas;
	if(position[0] == 'top') {
		thisCanvas = tagCon('canvas', {'class': 'lineCanvas'}, {'position': 'absolute', 'bottom': '-130px', 'height': '130px'});		
	}else {
		thisCanvas = tagCon('canvas', {'class': 'lineCanvas'}, {'position': 'absolute', 'top': '-130px', 'height': '130px'});
	}
	drawLine(thisCanvas[0], {lineColor: '#521717', startHeight: position[0], lastWidth: position[1]});
	return thisCanvas;
}

	
$("#key").append(keyCanvas);


if(status == '01') {
	var items = $(".item");
	$('.formwork-prop').remove();
	drawKey.draw({fillColor: '#272525'});
	
	items[0].append('축하합니다. 키를 만드셨습니다 !');
	items[2].append();
} else if(status == '02'){
	var items = $(".item");
	$('.formwork-prop').remove();
	drawKey.draw({fillColor: '#984949'});
	
	items[0].append('키 만들기를 실패하였습니다 ...');
	items[2].append(tagCon('button', {'type':'button', 'onclick': 'window.history.back();'}).html('돌아가기')[0]);
} else {
	formTag.attr('action', 'signUp');
	drawKey.draw({fillColor: '#521717'});	
}

$("#userKey").keyup(function() {
	var data = $(this).val();
	var formWork_prop = $(this).parents('.formwork-prop');
	var errorDiv = formWork_prop.find('.duplicated-error');
	var prop_height = formWork_prop[0].offsetHeight;
	var regular = /^[a-zA-Z0-9]+$/;
	
	formPropOk[0] = false;
	
	if(data.length === 0){
		errorDiv.css('color', 'red').html('');
		formWork_prop.find('.lineCanvas').remove();
	}else if(!data.match(regular)) {
		errorDiv.css('color', 'red').html('영문과 숫자만 가능합니다 ..');		        			        	
		formWork_prop.find('.lineCanvas').remove();
	}else {
		if(data.length > 3) {
			errorDiv.html('');
			
			aJax_('whoIsIt', {it: data, is: 'userKey'}, (userData) => {
				if(userData.length === 0) {
					errorDiv.css('color', 'green').html('사용 가능한 키입니다 !');
					if(formWork_prop.find('.lineCanvas').length === 0){
						var thisCanvas = lineCanvas(['top', 'right']);
						
						formWork_prop.append(thisCanvas);
						formPropOk[0] = true;
					}
				}else {
					errorDiv.css('color', 'red').html('이미 사용 중인 키입니다 ..');		        			        	
					formWork_prop.find('.lineCanvas').remove();
				}
			});
			
			
		}else {
			errorDiv.css('color', 'red').html('4자 이상입니다.');
			formWork_prop.find('.lineCanvas').remove();
		}
	}
	
	
});

$("#name").keyup(function() {
	var data = $(this).val();
	var formWork_prop = $(this).parents('.formwork-prop');
	var errorDiv = formWork_prop.find('.duplicated-error');
	var prop_height = formWork_prop[0].offsetHeight;
	var regular = /^[가-힣a-zA-Z]+$/;
	
	formPropOk[1][0] = false;
	
	if(data.length === 0) {
		errorDiv.css('color', 'red').html('');
		formWork_prop.find('.lineCanvas').remove();		
	} else if(!data.match(regular)) {
		errorDiv.css('color', 'red').html('이름 형식이 잘못되었습니다 ...');
		formWork_prop.find('.lineCanvas').remove();		
	} else {
		if(data.length < 2) {
			errorDiv.css('color', 'red').html('이름이 너무 짧습니다 ..');			
			formWork_prop.find('.lineCanvas').remove();		
		}else {
			errorDiv.css('color', 'red').html('');	
			formPropOk[1][0] = true;
			if(formPropOk[1][1]) {
				if(formWork_prop.find('.lineCanvas').length === 0){
					var thisCanvas = lineCanvas(['top', 'left']);
					
					formWork_prop.append(thisCanvas);
				}				
			}
		}
	}
	
});

$("#nickName").keyup(function() {
	var data = $(this).val();
	var formWork_prop = $(this).parents('.formwork-prop');
	var errorDiv = formWork_prop.find('.duplicated-error');
	var prop_height = formWork_prop[0].offsetHeight;
	var regular = /^[가-힣a-zA-Z0-9]+$/;
	
	formPropOk[1][1] = false;
	
	if(data.length === 0) {
		errorDiv.css('color', 'red').html('');
		formWork_prop.find('.lineCanvas').remove();		
	} else if(!data.match(regular)) {
		errorDiv.css('color', 'red').html('닉네임 형식이 잘못되었습니다 ...');
		formWork_prop.find('.lineCanvas').remove();				
	} else {	
		if(data.length < 2) {
			errorDiv.css('color', 'red').html('닉네임이 너무 짧습니다 ..');			
			formWork_prop.find('.lineCanvas').remove();		
		}else {
			
			aJax_('whoIsIt', {it: data, is: 'nickName'}, (userData) => {
				if(userData.length === 0) {
					errorDiv.css('color', 'red').html('');
					formPropOk[1][1] = true;
					if(formPropOk[1][0]) {
						if(formWork_prop.find('.lineCanvas').length === 0){
							var thisCanvas = lineCanvas(['top', 'left']);
							
							formWork_prop.append(thisCanvas);
						}				
					}
				}else {
					errorDiv.css('color', 'red').html('이미 사용 중인 닉네임입니다 ..');		        			        	
					formWork_prop.find('.lineCanvas').remove();
				}
				
			});
			
		}
	}
	
});

$("#password").keyup(function() {
	var data = $(this).val();
	var formWork_prop = $(this).parents('.formwork-prop');
	var errorDiv = formWork_prop.find('.duplicated-error');
	var prop_height = formWork_prop[0].offsetHeight;
	
	formPropOk[2][0] = false;
	
	if(data.length === 0) {
		errorDiv.css('color', 'red').html('');			
		formWork_prop.find('.lineCanvas').remove();					
		
	}else {
		if(data.length < 4) {
			errorDiv.css('color', 'red').html('비밀번호는 4자 이상입니다.');
			formWork_prop.find('.lineCanvas').remove();					
		} else {
			errorDiv.css('color', 'red').html('');			
			formWork_prop.find('.lineCanvas').remove();					
			formPropOk[2][0] = true;
		}
	}
		
});

$("#passwordC").keyup(function() {
	var pwdData = $("#password").val();
	var data = $(this).val();
	var formWork_prop = $(this).parents('.formwork-prop');
	var errorDiv = formWork_prop.find('.duplicated-error');
	var prop_height = formWork_prop[0].offsetHeight;
	
	formPropOk[2][1] = false;
	
	if(pwdData.length === data.length) {
		if(!pwdData == data) {
			errorDiv.css('color', 'red').html('비밀번호가 일치하지 않습니다..');
			formWork_prop.find('.lineCanvas').remove();			
		}else {
			if(formPropOk[2]) {
				errorDiv.css('color', 'green').html('비밀번호가 일치합니다.');
				formWork_prop.find('.lineCanvas').remove();		
				if(formWork_prop.find('.lineCanvas').length === 0){
					var thisCanvas = lineCanvas(['bottom', 'right']);
					
					formWork_prop.append(thisCanvas);        		
					formPropOk[2][1] = true;
				}
			}
			
		}
	} else {
		errorDiv.css('color', 'red').html('');
		formWork_prop.find('.lineCanvas').remove();					
	}
	
});


function formCheck() {
	var isForm = false;
	
	if(!formPropOk.includes(false) && !formPropOk[1].includes(false) && !formPropOk[2].includes(false)) {
		isForm = true;
	}
	
	return isForm;
}