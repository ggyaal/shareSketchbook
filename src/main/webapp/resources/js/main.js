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