const token_ = $('meta[name="_csrf"]').attr('content').split(',');

let user_ = {
		get userKey() {
			return this._userKey;		
		},
		get emailId() {
			return this._emailId;
		},
		get name() {
			return this._name;
		},
		get nickName() {
			return this._nickName;
		},
		get gender() {
			return this._gender;
		},
		get lv() {
			return this._lv;
		},
		get photo() {
			return this._photo;
		},
		get contents() {
			return this._contents;
		},
		get coverTitle() {
			return this._coverTitle;			
		},
		get flagList() {
			return this._flagList;
		},
		get cover() {
			return this._cover;
		},
		get coverColor() {
			return this._coverColor;
		},
		get flag() {
			return this._flag;
		},
		get page() {
			return this._page;
		},
		get spring() {
			return this._spring;
		},
		set user_(userData) {
			this._userKey = userData.userKey;			
			this._emailId = userData.emailId;
			this._name = userData.name;
			this._nickName = userData.nickName;
			this._gender = userData.gender;
			this._lv = userData.lv;
			this._photo = userData.photo;			
		},
		set custom(custom) {
			this._contents = custom.contents;
			this._coverTitle = custom.coverTitle;			
			this._flagList = custom.flagList;
			this._cover = custom.cover;
			this._coverColor = custom.coverColor;
			this._flag = custom.flag;
			this._page = custom.page;
			this._spring = custom.spring;	
		},
		set userKey(userKey) {
			this._userKey = userKey;			
		},
		set emailId(emailId) {
			this._emailId = emailId;
		},
		set name(name) {
			this._name = name;
		},
		set nickName(nickName) {
			this._nickName = nickName;
		},
		set gender(gender) {
			this._gender = gender;
		},
		set lv(lv) {
			this._lv = lv;
		},
		set photo(photo) {
			this._photo = photo;
		},
		set contents(contents) {
			this._contents = contents;
		},
		set coverTitle(coverTitle) {
			this._coverTitle = coverTitle;			
		},
		set flagList(flagList) {
			this._flagList = flagList;
		},
		set cover(cover) {
			this._cover = cover;
		},
		set coverColor(coverColor) {
			this._coverColor = coverColor;
		},
		set flag(flag) {
			this._flag = flag;
		},
		set page(page) {
			this._page = page;
		},
		set spring(spring) {
			this._spring = spring;
		}
}

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
			trans += ('0' + value.length).slice(-2);
		});	
	} else if(deep < 0) {
		colors.forEach(function(item, idx) {
			var value = Math.floor(item * Math.abs(deep)).toString(16);
			trans += value.length == 2? value : 'ff';
		});
	}
	
	return trans;
}

const randomColor = () => {
	var result = '#';
		for(i=0; i<3; i++) {
			result += (255 - Math.floor((Math.random() * 127) + 1)).toString(16);
		}
	return result;
}

const rgbTohex = (code) => {
	if (code.search("rgb") == -1) {
		return code;
	} else {
		if(code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/)) {
			code = code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		}else if(code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/)) {
			code = code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(0\.\d+))?\)$/);
		}else if(code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\.\d+))?\)$/)) {
			code = code.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\.\d+))?\)$/);
		}
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(code[1]) + hex(code[2]) + hex(code[3]); 
	}
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