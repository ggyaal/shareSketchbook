const token_header = $("meta[name='_csrf_header']").attr('content');
const token_name = $("meta[name='_csrf_name']").attr('content');
const token_ = $("meta[name='_csrf']").attr('content');

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
			crsfToken.setRequestHeader(token_header, token_);
		}
	});
}

const csrf_token_form = (locate) => {
	var hiddenInput = $("<input>").attr("type", "hidden")
								.attr('name', token_name)
								.attr('value', token_);
	locate.append(hiddenInput);
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
