const token_ = $('meta[name="_csrf"]').attr('content').split(',');

function aJax_isLogin(isLogin) {
	$.ajax({
	    data		: "",
	    type		: "POST",
	    url			: 'isLogin',
	    success		: function(userKey) {
	        if(userKey!='anonymousUser') {
	        	isLogin(true);
	        } else {
				isLogin(false);
			}
	    },
		beforeSend	: function(crsfToken){
			crsfToken.setRequestHeader(token_[0], token_[2]);
		}
	});
}

function aJax_whoIsIt(it, is, callBack) {
	$.ajax({
		data		: {
			it: it,
			is: is
		},
		type		: "POST",
		url			: 'whoIsIt',
		success		: (userData) => {
			callBack(userData);
		},
		beforeSend	: function(crsfToken){
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
	const modalBg = $("<div>").addClass("modal-bg")
					.attr("id", contentClass + "-bg")
					.css("margin", -parentPadding);
	if(isVi === true) $("." + contentClass).append(modalBg);
	else $("." + contentClass + " .modal-bg").remove();
}
	
$(document).on("click", ".modal-bg", function(){
	var modal_location = $(this).attr("id").slice(0, -3);
	$("." + modal_location + " .modal-con").remove();
	$(this).remove();
});