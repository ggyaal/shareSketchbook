const mainBook = $(".main-book");
const bookPages = mainBook.find(".move-page");
const nextPageBtn = $("<div>").addClass("book-next");
const prevPageBtn = $("<div>").addClass("book-prev");
const lockDiv = (isVi) => {
	if(isVi) {
		$(".lock-off").remove();
		$(".lock-off-bg").remove();
		var lockOn = $("<div>").addClass("lock-on").append($("<div>").addClass("lock-click"));
		var lockOnBg = $("<div>").addClass("lock-on-bg");
		mainBook.append(lockOn).append(lockOnBg);
	} else {
		$(".lock-on").remove();
		$(".lock-on-bg").remove();
		var lockOff = $("<div>").addClass("lock-off").append($("<div>").addClass("lock-click"));
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
		var modal = $("<div>").addClass("login-modal modal-con");
		var formTag = $("<form>").attr("action", "login")
		.attr("method", "post");		
		var title = $("<b>").addClass("modal-title")
		.html("열쇠 입력");
		modal.append(title);
		
		var keyForm = $("<div>").addClass("text-form");
		var userKey = $("<input>")
							.attr("type", "text")
							.attr("class", "login-input")
							.attr("id", "userKey")
							.attr("name", "userKey")
							.attr("placeholder", "userKey");
		keyForm.append(userKey);
		var passForm = $("<div>").addClass("text-form");
		var password = $("<input>")
							.attr("type", "password")
							.attr("class", "login-input")
							.attr("id", "password")
							.attr("name", "password")
							.attr("placeholder", "password");
		passForm.append(password);
		
		var keyInBtn = $("<button>").addClass("key-in")
									.html("열쇠 넣기")
									.css("float", "right")
									.css("display", "none");
		formTag.append(keyForm).append(passForm).append(keyInBtn);
		
		csrf_token_form(formTag);
		
		modal.append(formTag);
		var keys = $("<div>").addClass("keys");
		var keysImg = $("<div>").addClass("keysImg");
		keys.append(keysImg);
		modal.append(keys);
		
		
		modal_bg("main-book", 20);
		mainBook.append(modal);
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
       }}, '.lock-click');
