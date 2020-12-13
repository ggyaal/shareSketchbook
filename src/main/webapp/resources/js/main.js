const token_ = $('meta[name="_csrf"]').attr('content').split(',');

const aJax_ = (url, data, callBack) => {
	$.ajax({
		data: data,
		type: 'POST',
		url: url,
		success: (data) => {
			callBack(data);
		},
		beforeSend: function(crsfToken) {
			crsfToken.setRequestHeader(token_[0], token_[2]);
		}
	});
}

const csrf_token_form = (locate) => {
	var hiddenInput = $("<input>").attr("type", "hidden")
								.attr('name', token_[1])
								.attr('value', token_[2]);
	locate.append(hiddenInput);
}


const tagCon = (tag, tagAttr, tagCss) => {
	var this_tag = $('<' + tag + '>');
	if(tagAttr) this_tag.attr(tagAttr);
	if(tagCss) this_tag.css(tagCss);
	return this_tag;
}


const modal_bg = (contentClass, parentPadding = 0, isVi = true) => {
	var modalBg = $("<div>").addClass("modal-bg")
					.attr("id", contentClass + "-bg")
					.css("margin", -parentPadding);
	if(isVi === true) $("." + contentClass).append(modalBg);
	else $("." + contentClass + " .modal-bg").remove();
}

const alert_ = (place, placeMargin, alertId, content, isCancel = false) => {
	if($('#' + alertId).length!=0) return;
	
	var alertWin = $('<div />', {id: alertId, class: ' alert- modal-con', 'data-modal': place.slice(1)});
	var alertCon = $('<div />',{class: 'alert-content'});
	var alertBtn = $('<div />', {class: 'alert-btn'});
	
	alertCon.html(content);
	if(isCancel) {
		alertBtn.append($('<div />', {name: 'alert-cancel', class: 'alert-btn-'}).html('취소'));
	}
	alertBtn.append($('<div />', {name: 'alert-ok', class: 'alert-btn-'}).html('확인'));
	
	alertWin.append(alertCon).append(alertBtn);
	
	modal_bg(place.slice(1), placeMargin);
	$(place).append(alertWin);
	
}

const transColor = (hexColor, deep = 2) => {
	var trans = '#';
	var colors = [parseInt(hexColor.slice(1, 3), 16), parseInt(hexColor.slice(3, 5), 16), parseInt(hexColor.slice(5), 16)]; // red, green, blue
	
	if(deep >=0) {
		colors.forEach((item, idx) => {
			var value = Math.floor(item / deep).toString(16);
			trans += value.length == 2? value : '0' + value;
		});	
	} else if(deep < 0) {
		colors.forEach(function(item, idx) {
			var value = Math.floor(item * Math.abs(deep)).toString(16);
			trans += value.length == 2? value : 'ff';
		});
	}
	
	return trans;
}

const removModal = (location) => {
	$('.' + location + ' .modal-con').remove();
	$('.' + location + ' .modal-bg').remove();
	
	var event = $.Event('alertCancel', {loc: location});
	$('body').trigger(event);
};
	
$(document).on("click", ".modal-bg", function() {
	removModal($(this).attr("id").slice(0, -3));
});

$(document).on('click', 'div[name="alert-cancel"]', function() {
	removModal($(this).parents('.alert-').attr('data-modal'));
});

$(document).on('click', 'div[name="alert-ok"]', function() {
	var thisAlert = $(this).parents('.alert-').attr('id');
	var event = $.Event('alertOk', {alertId: thisAlert});
	$('body').trigger(event);
});