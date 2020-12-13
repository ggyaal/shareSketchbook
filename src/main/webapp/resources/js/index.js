var currentPage = 0;
var finalPage;
var isMove = true;
var bookAlert = true;
var page_ren = false;
var flag_ren = false;
var color_ren = false;

const mainBook = $(".main-book");
const bookPages = mainBook.find(".move-page");
const nextPageBtn = $("<div>").addClass("book-next");
const prevPageBtn = $("<div>").addClass("book-prev");
const flagCon = $('<div />', {class: 'flag-con'}).html($('<div />', {class: 'flag-'}));
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
const pageRender = (num, coverTitle) => {
	$('.main-book-page').remove();
	return new Promise(function(resolve, reject) { 
		if(coverTitle) $('#p0').find('b').html(coverTitle);
		
		for(i=0;i<num;i++) {
			var page = $('<div />', {
				id: 'p' + (i+1),
				class: 'main-book-page move-page'
			}).css({'z-index': num - i}).html($('<div />', {class: 'page-content'}));
			
			mainBook.append(page);
			
			if(i == num - 1) {
				page.addClass('final-page');
				finalPage = num;
			}
		}
		
		page_ren = true;
		resolve('success');
	});
}
const flagRender = (flagList = '', flag) => {
	$('.page-flag').remove();
	return new Promise(function(resolve, reject) { 
		if(!page_ren) reject('fail');
		
		var pages = $('.move-page');
		var flagsInterval = 45;
		
		flagList.split(',').forEach(function(item, idx) {
			var this_flag = $('<div />', {
				class: 'page-flag'
			}).css('top', (30 + (flagsInterval * idx)) + 'px')
			.html($('<div />', {class: 'flag-head', 'data-page': item}));
			
			pages.eq(item).append(this_flag);
		});
		
		var flagColor = {};
		flag.split(',').forEach(function(item, idx) {
			var _flagNo = item.slice(0, 1);
			var _flagColor = item.slice(1);
			
			flagColor[_flagNo] = _flagColor;
		});
		
		$.each(flagColor, function(key, value) {
			pages.eq(key).find('.flag-head').css('background', value);
		});
		
		flag_ren = true;
		resolve('success');
	});
}
const colorRender = (cover, coverColor, page, spring) => {
	return new Promise(function(resolve, reject) { 
		if(!page_ren) reject('fail');
		
		if(cover) $('#p0').css('background', cover);
		if(coverColor) $('#p0').find('b').css('color', coverColor);
		if(page) $('.main-book-page').css('background-color', page);
		if(spring) {
			$('head').append($('<style />', {type: 'text/css'}).append('.main-book.cust:before {background: ' + transColor(spring, 1.3) + '; } .main-book.cust:after {background: ' + spring + '; }'));
			$('.main-book').addClass('cust');
		}	
		color_ren = true;
		resolve('success');
	});
}

const allRender = async (user_) => {
	await pageRender(user_.contents.split(',').length, user_.coverTitle);
	await flagRender(user_.flagList, user_.flag);
	await colorRender(user_.cover, user_.coverColor, user_.page, user_.spring);
	
	mainBook.append(nextPageBtn).append(prevPageBtn).append(flagCon);
	
	var successEvent = $.Event('pageRenderSuccess');
	$('body').trigger(successEvent);
}
const user_is = () => {
	aJax_('isLogin', '', (isLogin) => {
		if(isLogin != 'anonymousUser' || isLogin === undefined || isLogin === null) {
			aJax_('whoIsIt', {it: isLogin, is: 'userKey'}, (userData) => {
				user_.user_ = userData[0];
				aJax_('userCustom', {userKey: isLogin}, (customData) => {
					user_.custom = customData;
					
					$('body').trigger('user_on');
				});
			});
					
			lockDiv(false);
			
		} else {
			lockDiv(true);
		}
		
	});
}

$('body').on('user_on', function() {
	allRender(user_);
});

$(function() {
	
	user_is();
	
});

$('body').on('pageRenderSuccess', function(data) {
	viewToPage(currentPage);
	
	// page
	function viewToPage(pageNum) {
		var crntPage = $('.active-page');
		var viewPage = $('#p' + pageNum);
		
		isMove = false;
		
		if(currentPage == pageNum) {
			
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
	
	// next, prev button
	nextPageBtn.click(function() {
		var crntPage = $('.active-page');
		
		if(currentPage == $('.move-page').length) {
			alert_('.main-book', 20, '_alert', '마지막 페이지입니다.', false);
			return;
		}else if(isMove && bookAlert) {
			crntPage.css("transform", "");
			viewToPage(currentPage + 1);
		}
	});
	
	prevPageBtn.click(function() {
		var crntPage = $('.active-page');
		var prevPage = crntPage.prev(".move-page");
		
		if($('.active-page').length === 0) {
			prevPage = $('.final-page');
		}
		
		if(currentPage == 0) {
			alert_('.main-book', 20, '_alert', '첫번째 페이지입니다.', false);
			return;
		}else if(isMove && bookAlert) {
			prevPage.css("transform", "");
			viewToPage(currentPage - 1);
		}
		
	});
	
	nextPageBtn.hover(function() {
		var crntPage = $(".active-page");
		if(isMove && bookAlert) crntPage.css("transform", "perspective(2000px) rotateX(15deg)");	
	}, function() {
		var crntPage = $(".active-page");
		if(isMove && bookAlert) crntPage.css("transform", "");
	});

	prevPageBtn.hover(function() {
		var prevPage = $(".active-page").prev(".move-page");
		
		if($('.active-page').length === 0) {
			prevPage = $('.final-page');
		}
		
		if(isMove && bookAlert) {
			prevPage.css("opacity", 1);			
			prevPage.css("transform", "perspective(2000px) rotateX(250deg)");			
		}
	}, function() {
		var prevPage = $(".active-page").prev(".move-page");
		
		if($('.active-page').length === 0) {
			prevPage = $('.final-page');
		}
		
		if(isMove && bookAlert) {
			prevPage.css("opacity", 0);			
			prevPage.css("transform", "perspective(2000px) rotateX(261deg)");
		}
	});
	
	
	// flags
	$(document).on('click', '.flag-head', function() {
		var thisPage = $(this).attr('data-page') * 1;
		if(bookAlert) viewToPage(thisPage); 
	});
	$(document).on('click', '.flag-con .flag-', function() {
		if(bookAlert) {
			alert_('.main-book', 20, 'makeFlag', '이 페이지에 붙일까요?', true);	
		}
		bookAlert = false;
	});
	
	$(document).on('click', '.page-flag', function(e) {
		if(e.target.className == 'flag-head') return;
		alert_('.main-book', 20, 'deleteFlag', '스티커를 제거할까요?', true);	
		
	});
	
	$(document).on({
		mouseenter: function (e) { 
			if(e.target.className == 'flag-head') return;
			$(this).css({'box-shadow': 'rgb(0, 0, 0) 25px 0px 30px 10px', 'opacity': 1});
		},
   		mouseleave: function (e) {	
   			$(this).css({'box-shadow': '', 'opacity': ''});
   		}
	}, '.page-flag');
	
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

//alert
$('body').on('alertOk', function(data) {
	removModal($('#' + data.alertId).attr('data-modal'));
	
	if(data.alertId == '_alert') {
		bookAlert = true;
		
	}  else if(data.alertId == 'makeFlag') {
		bookAlert = true;
		var flagList = [];
		
		$('.flag-head').each(function() {
			flagList.push($(this).attr('data-page') * 1);
		});
		
		if(flagList.includes(currentPage)) {
			alert_('.main-book', 20, '_alert', '이미 붙혀있습니다.', false);
			return;
		} else if(currentPage == 0 || currentPage == finalPage + 1) {
			alert_('.main-book', 20, '_alert', '해당 페이지는 붙힐 수 없습니다.', false);
			return;			
		} else {
			flagList.push(currentPage);
		}
		
		flagList.sort(function(a, b) {
			return a - b;
		});
		
		aJax_('setCustom', {'flagList': flagList.join(',')}, function(data) {
			if(data) {
				var event = $.Event('flagRender', {flagList: flagList.join(',')});
				$('body').trigger(event);
			}else {
				alert_('.main-book', 20, '_alert', '다시 시도해주세요 ..', false);
			}
		});
	}else if(data.alertId == 'deleteFlag') {
		var flagList = user_.flagList.split(',');
		var idx = flagList.indexOf('' + currentPage);
		flagList.splice(idx, 1);
		
		aJax_('setCustom', {'flagList': flagList.join(',')}, function(data) {
			if(data) {
				var event = $.Event('flagRender', {flagList: flagList.join(',')});
				$('body').trigger(event);
			}else {
				alert_('.main-book', 20, '_alert', '다시 시도해주세요 ..', false);
			}
		});
		
	}
});

$('body').on('alertCancel', function(data) {
	if(data.loc == 'main-book') {
		bookAlert = true;
	}
});

// reRender
$('body').on('flagRender', function(data) {
	user_.flagList = data.flagList;
	flagRender(user_.flagList, user_.flag);
});