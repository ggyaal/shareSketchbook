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

	aJax_isLogin((isLogin) => {
		
		if(isLogin) {
			mainBook.append(nextPageBtn).append(prevPageBtn);
			lockDiv(false);
		} else {
			lockDiv(true);
		}
	
	});

});


var currentPage = 0;
var isMove = true;


bookPages.get(0).classList.add("active-page");
bookPages.get(1).classList.add("active-prev-page");

function activeToPage(index = 1) {
	var currentPage = $(".active-page");
	var nextPage = $(".active-prev-page");
	
	if(index === 1) {
		currentPage.removeClass("active-page");
		currentPage.next(".move-page").addClass("active-page");
		setTimeout(() => {
			nextPage.removeClass("active-prev-page");
			nextPage.next().addClass("active-prev-page");			
		}, 500);
	}else if(index === -1) {
		nextPage.removeClass("active-prev-page");
		nextPage.prev().addClass("active-prev-page");			
		setTimeout(() => {
			currentPage.removeClass("active-page");
			currentPage.prev(".move-page").addClass("active-page");
		}, 500);
	}
}

nextPageBtn.click(function() {
	var currentPage = $(".active-page");
	isMove = false;
	
	if(currentPage.hasClass("fixed-page")) {
		alert("마지막 페이지 입니다 !");
		isMove = true;
		return;
	}
	currentPage.css("transform", "rotateX(261deg)");
	activeToPage();
	setTimeout(() => {
		currentPage.css("opacity", 0);		
		isMove = true;
	}, 1000);
});

prevPageBtn.click(function() {
	var currentPage = $(".active-page");
	if(currentPage.hasClass("main-book-cover")) return;

	isMove = false;
	currentPage.prev(".move-page").css("opacity", 1);			
	currentPage.prev(".move-page").css("transform", "");
	activeToPage(-1);
	setTimeout(() => {
		isMove = true;
	}, 1000);
});

nextPageBtn.hover(function() {
	var currentPage = $(".active-page");
	if(isMove && !currentPage.hasClass("fixed-page")) currentPage.css("transform", "rotateX(15deg)");	
}, function() {
	var currentPage = $(".active-page");
	if(isMove && !currentPage.hasClass("fixed-page")) currentPage.css("transform", "");
});

prevPageBtn.hover(function() {
	var currentPage = $(".active-page");
	if(isMove) {
		currentPage.prev(".move-page").css("opacity", 1);			
		currentPage.prev(".move-page").css("transform", "rotateX(250deg)");			
	}
}, function() {
	var currentPage = $(".active-page");
	if(isMove) {
		currentPage.prev(".move-page").css("opacity", 0);			
		currentPage.prev(".move-page").css("transform", "rotateX(261deg)");	
	}
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
