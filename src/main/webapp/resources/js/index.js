const mainBook = $(".main-book");
const bookPages = mainBook.find(".move-page");
const nextPageBtn = $("<div>").addClass("book-next");
const prevPageBtn = $("<div>").addClass("book-prev");
const lockDiv = (isVi) => {
	if(isVi) {
		$(".lock-off").remove();
		$(".lock-off-bg").remove();
		var lockOn = tagCon('div', {'class': 'lock-on'}).append(tagCon('div', {'class': 'lock-click'}));
		var lockOnBg = tagCon('div', {'class': 'lock-on-bg'});
		mainBook.append(lockOn).append(lockOnBg);
	} else {
		$(".lock-on").remove();
		$(".lock-on-bg").remove();
		var lockOff = tagCon('div', {'class': 'lock-off'}).append(tagCon('div', {'class': 'lock-click'}));
		mainBook.append(lockOff);
	}
}

$(function() {
	
	const pageNo = 10;

	for(i=0;i<pageNo;i++) {
		var page = $('<div />', {
			id: 'p' + (i+1),
			class: 'main-book-page move-page'
		}).css({'z-index': pageNo - i}).html($('<div />', {class: 'page-content'}));
		
		mainBook.append(page);
		
		if(i == pageNo - 1) page.addClass('final-page');
	}
	
	

	aJax_('isLogin', '', (isLogin) => {
		if(isLogin != 'anonymousUser' || isLogin === undefined || isLogin === null) {
			mainBook.append(nextPageBtn).append(prevPageBtn);
			lockDiv(false);
		} else {
			lockDiv(true);
		}
	
	});
	
	var currentPage = 0;
	var isMove = true;
	
	function viewToPage(pageNum) {
		var crntPage = $('.active-page');
		var viewPage = $('#p' + pageNum);
		
		isMove = false;
		
		if(currentPage == pageNum) {
			alert('현재 페이지입니다.');
		}else if(currentPage < pageNum) {
			for(i=currentPage; i<pageNum; i++) {
				thisPageBack(i);
			}
		} else {
			for(i=currentPage; i>=pageNum; i--) {
				thisPageFront(i);
			}
		}
		
		crntPage.removeClass('active-page');
		viewPage.addClass('active-page');
		currentPage = pageNum;
		isMove = true;
		
	}
	
	function thisPageBack(pageNum) {
		var thisPage = $('#p' + pageNum);
		thisPage.addClass('page-back');
		
		setTimeout(function() {
			thisPage.css('opacity', '0');
		}, 1000);
	}
	
	function thisPageFront(pageNum) {
		var thisPage = $('#p' + pageNum);
		thisPage.css('opacity', '1').removeClass('page-back');
		
	}
	
	nextPageBtn.click(function() {
		var crntPage = $('.active-page');

		if(isMove) crntPage.css("transform", "");
		viewToPage(currentPage + 1);
	});
	
	prevPageBtn.click(function() {
		var crntPage = $('.active-page');
		var prevPage = $(".active-page").prev(".move-page");
		
		if(crntPage.attr('id') == 'p0') {
			alert('첫번째 페이지 입니다.');
			return;
		}
		if(isMove) prevPage.css("transform", "");
		viewToPage(currentPage - 1);
		
	});
	
	nextPageBtn.hover(function() {
		var crntPage = $(".active-page");
		if(isMove) crntPage.css("transform", "perspective(2000px) rotateX(15deg)");	
	}, function() {
		var crntPage = $(".active-page");
		if(isMove) crntPage.css("transform", "");
	});

	prevPageBtn.hover(function() {
		var prevPage = $(".active-page").prev(".move-page");
		if(isMove) {
			prevPage.css("opacity", 1);			
			prevPage.css("transform", "perspective(2000px) rotateX(250deg)");			
		}
	}, function() {
		var prevPage = $(".active-page").prev(".move-page");
		if(isMove) {
			prevPage.css("opacity", 0);			
			prevPage.css("transform", "perspective(2000px) rotateX(261deg)");	
		}
	});
	
});


// login
function loginModal() {
	var mainBook = $(".main-book");
	
	if(mainBook.find(".login-modal").length == 0) {
		var modal = tagCon('div', {'class': 'login-modal modal-con'});
		var formTag = tagCon('form', {'action': 'login', 'method': 'post'});	
		var title = tagCon('b', {'class': 'modal-title'}).html("열쇠 입력");
		modal.append(title);
		
		var keyForm = tagCon('div', {'class': 'text-form'});
		var userKey = tagCon('input', {'type': 'text', 'class': 'login-input', 'id': 'userKey', 'name': 'userKey', 'placeholder': 'userKey'});
		keyForm.append(userKey);
		var passForm = tagCon('div', {'class': 'text-form'});
		var password = tagCon('input', {'type': 'password', 'class': 'login-input', 'id': 'password', 'name': 'password', 'placeholder': 'password'});
		passForm.append(password);
		
		var keyInBtn = tagCon('button', {'id': 'key-in'}, {'float': 'right', 'display': 'none'}).html('열쇠 넣기');
		formTag.append(keyForm).append(passForm).append(keyInBtn);
		
		csrf_token_form(formTag);
		
		modal.append(formTag);
		var makeKey = tagCon('a', {'href': 'sign', 'class': 'modal-link', 'id': 'makeKey'}).html('열쇠가 없으신가요?');
		modal.append(makeKey);
		
		var keys = tagCon('div', {'class': 'keys'});
		var keysImg = tagCon('div', {'class': 'keysImg'});
		keys.append(keysImg);
		modal.append(keys);
		
		
		modal_bg("main-book", 20);
		mainBook.append(modal);
		
		$("#userKey").keyup(function() {
			var data = $(this).val();
			
		});
	}
	else {
		modal_bg("main-book", 20, false);
		mainBook.find(".login-modal").remove();
	}
}

$(document).on('click', '.lock-on .lock-click', () => {
	loginModal();
});
$(document).on('click', '.lock-off .lock-click', () => {
	location.href = 'logout';
});

$(document).on({
			mouseenter: function () {           
				var lockOn = $(".lock-on");
				var lockOnBg = $(".lock-on-bg");
				lockOn.css("transform", "rotate(-45deg) translate(-80px, 95px)");
				lockOnBg.css("transform", "rotate(-45deg) translate(-80px, 95px)");
       },
       		mouseleave: function () {           
				var lockOn = $(".lock-on");
				var lockOnBg = $(".lock-on-bg");
				lockOn.css("transform", "");	
				lockOnBg.css("transform", "");	
       }
}, '.lock-click');
