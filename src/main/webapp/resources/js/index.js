var currentPage = 0;
var finalPage;
var isMove = true;
var bookAlert = true;
var page_ren = false;
var flag_ren = false;
var color_ren = false;
var ui_ren = false;

const mainBook = $(".main-book");
const bookPages = mainBook.find(".move-page");
const contentToPage = (_contents) => {
	var isChange = false;
	var _order = [];
	_contents.forEach(function(item, idx) {
		if(item == 'cover') return;
		_order.push(user_.contents.split(',').indexOf(item) + 1);
	});
	
	_order.some(function(item, idx) {
		if(item!=idx) isChange = true;
		return item!=idx;
	});
	
	if(isChange) {
		var oFlag = user_.flag.split(',');
		var sFlag = [];
		var _flagList = [];
		
		oFlag.forEach(function(item, idx) {
			var _oIdx = item.slice(0, 1) * 1;
			var _sIdx = _order.indexOf(_oIdx) + 1;
			
			if(_sIdx!=0) {
				sFlag.push(item.replace(_oIdx, _sIdx));
				_flagList.push(_sIdx);
			}
			
		});
		_flagList.sort();
		
		return [_flagList, sFlag];
	}
}
const form_submit = function() {
	var userKey = $('#userKey').val();
	var password = $('#password').val();
	
	if(userKey.length < 3 || password.length < 3) {
		alert_('.main-book', '_alert', '키 또는 비밀번호가 짧습니다...', false);
		return false;
	}
	return true;
}
const colorPickerRender = () => {
	var colorPicker = new iro.ColorPicker("#palette-pick-picker", {
		width: 200,
		color: "#fff",
		layout: [
					{ 
						component: iro.ui.Wheel,
						options: {
							borderColor: '#000000',
							wheelDirection: 'clockwise'
		          
						}
					},
					{ 
						component: iro.ui.Slider,
						options: {
							sliderType: 'hue'
						}
					},
					{
						component: iro.ui.Slider,
						options: {
							sliderType: 'saturation'
						}
					}
				]
	});
		  
	colorPicker.on('color:change', function(color) {
		var pick = $('#palette-pick');
		var bro = pick.siblings();
		var sample = pick.parents('.sample_sib').siblings('.sample-img._active');
		
		pick.css('background', color.hexString);
		sample.find('.sample-obj').css('background', color.hexString);

		bro.css('background', '');
		bro.find('*').remove();
	});
}
const palette = (add_class) => {
	var palette = $('<div />', {class: 'palette'}).addClass(add_class);
	var doc = $('<div />', {id: 'palette-doc', class: 'palette-'});
	var picker = $('<div />', {id: 'palette-pick', class: 'palette-'});
	
	palette.append([doc, picker]);
	return palette;
}
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
const flagRender = (flagList = '', flag = '') => {
	$('.page-flag').remove();
	return new Promise(function(resolve, reject) { 
		if(!page_ren) reject('fail');
		
		var pages = $('.move-page');
		var flagsInterval = 45;
		
		if(flagList && flagList != '') {
			flagList.split(',').forEach(function(item, idx) {
				var this_flag = $('<div />', {
					class: 'page-flag'
				}).css('top', (30 + (flagsInterval * idx)) + 'px')
				.html($('<div />', {class: 'flag-head', 'data-page': item}));
				
				pages.eq(item).append(this_flag);
			});		
		}
		
		if(flag && flag!='') {
			var flagColor = {};
			flag.split(',').forEach(function(item, idx) {
				var _flagNo = item.slice(0, 1) * 1;
				var _flagColor = item.slice(1);
				
				flagColor[_flagNo] = _flagColor;
			});
			
			$.each(flagColor, function(key, value) {
				pages.eq(key).find('.flag-head').css('background', value);
			});			
		}
		
		flag_ren = true;
		resolve('success');
	});
}
const colorRender = (cover, coverColor, page, spring) => {
	return new Promise(function(resolve, reject) { 
		if(!page_ren) reject('fail');
		
		if(cover) $('#p0').css('background', cover);
		if(coverColor) $('#p0').find('b').css('color', coverColor);
		if(page) {
			var pageList = page.split(',');
			if(pageList.length) {
				pageList.forEach(function(item, idx) {
					var _idx = item.slice(0, 1);
					var _color = item.slice(1);
					
					$('#p' + _idx).css('background-color', _color);
				});
			}
		}
		if(spring) {
			$('head').append($('<style />', {type: 'text/css'}).append('.main-book.cust:before {background: ' + transColor(spring, 1.3) + '; } .main-book.cust:after {background: ' + spring + '; }'));
			$('.main-book').addClass('cust');
		}	
		color_ren = true;
		resolve('success');
	});
}
const uiRender =() => {
	$('.book-next, .book-prev, .flag-con, .page-plus').remove();
	return new Promise(function(resolve, reject) { 
		var nextPageBtn = $("<div />",{class: 'book-next'});
		var prevPageBtn = $("<div />", {class: 'book-prev'});
		var flagCon = $('<div />', {class: 'flag-con'}).html($('<div />', {class: 'flag-con-'}).html($('<div />', {class: 'flag-'})));
		var pagePlus = $('<div />', {class: 'page-plus'}).html([$('<div />', {class: '_title'}), $('<div />', {id: 'sel-page', class: 'sel-'}), $('<div />', {id: 'sel-tool', class: 'sel-'})]);
		
		mainBook.append([nextPageBtn, prevPageBtn, flagCon, pagePlus]);
		ui_ren = true;
		resolve('success');
	});
}

const allRender = async (user_) => {
	var pageNo = 5;
		if(user_.contents && user_.contents.length!=0) {
			pageNo = user_.contents.split(',').length;
		}
	await pageRender(pageNo, user_.coverTitle);
	await flagRender(user_.flagList, user_.flag);
	await colorRender(user_.cover, user_.coverColor, user_.page, user_.spring);
	await uiRender();
	
	
	lockDiv(false);
	var successEvent = $.Event('allRenderSuccess');
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
		} else {
			lockDiv(true);
			user_.userKey = false;
		}
		
	});
}

$('body').on('user_on', function() {
	allRender(user_);
});

$(function() {
	
	user_is();
	
});

$('body').on('allRenderSuccess', function(data) {
	
	// page
	var viewToPage = (pageNum) => {
		if($('.active-page').length == 0) {
			$('#p0').addClass('active-page');
			currentPage = 0;
		}
		
		var crntPage = $('.active-page');
		var viewPage = $('#p' + pageNum);
		
		isMove = false;
		
		if(currentPage == pageNum) {
			
		}else if(currentPage < pageNum) {
			for(i=currentPage; i<pageNum; i++) {
				thisPageBack(i);
			}
			$('.page-out-modal').remove();
			var activeCon = $('._active');
			activeCon.find('*').removeAttr('style');
			activeCon.removeAttr('style').removeClass('_active');
		} else {
			for(i=currentPage; i>=pageNum; i--) {
				thisPageFront(i);
			}
			$('.page-out-modal').remove();
			var activeCon = $('._active');
			activeCon.find('*').removeAttr('style');
			activeCon.removeAttr('style').removeClass('_active');
		}
		
		crntPage.removeClass('active-page');
		viewPage.addClass('active-page');
		currentPage = pageNum;
		isMove = true;
		
	}
	
	var thisPageBack = (pageNum) => {
		var thisPage = $('#p' + pageNum);
		thisPage.addClass('page-back');
		
		setTimeout(function() {
			thisPage.css('opacity', '0');
		}, 1000);
	}
	
	var thisPageFront = (pageNum) => {
		var thisPage = $('#p' + pageNum);
		thisPage.css('opacity', '1').removeClass('page-back');
		
	}
	
	// next, prev button
	$(document).on('click', '.book-next', function() {
		var crntPage = $('.active-page');
		
		if(currentPage == finalPage + 1) {
			alert_2('.main-book', '마지막 페이지입니다.');
			return;
		}else if(isMove && bookAlert) {
			crntPage.css("transform", "");
			viewToPage(currentPage + 1);
		}
	});
	
	$(document).on('click', '.book-prev', function() {
		var crntPage = $('.active-page');
		var prevPage = crntPage.prev(".move-page");
		
		if($('.active-page').length === 0) {
			prevPage = $('.final-page');
		}
		
		if(currentPage == 0) {
			alert_2('.main-book', '첫번째 페이지입니다.');
			return;
		}else if(isMove && bookAlert) {
			prevPage.css("transform", "");
			viewToPage(currentPage - 1);
		}
		
	});
	
	$(document).on({
		mouseenter: function () {
			var crntPage = $(".active-page");
			if(isMove && bookAlert) crntPage.css("transform", "perspective(2000px) rotateX(15deg)");
		},
   		mouseleave: function () {
			var crntPage = $(".active-page");
			if(isMove && bookAlert) crntPage.css("transform", "");
   		}
	}, '.book-next');

	$(document).on({
		mouseenter: function () { 
			var prevPage = $(".active-page").prev(".move-page");
			
			if($('.active-page').length === 0) {
				prevPage = $('.final-page');
			}
			
			if(isMove && bookAlert) {
				prevPage.css("opacity", 1);
				prevPage.css("transform", "perspective(2000px) rotateX(250deg)");
			}
		},
   		mouseleave: function () {
			var prevPage = $(".active-page").prev(".move-page");
			
			if($('.active-page').length === 0) {
				prevPage = $('.final-page');
			}
			
			if(isMove && bookAlert) {
				prevPage.css("opacity", 0);
				prevPage.css("transform", "perspective(2000px) rotateX(261deg)");
			}
   		}
	}, '.book-prev');
	
	// flags
	$(document).on('click', '.flag-head', function() {
		var thisPage = $(this).attr('data-page') * 1;
		if(bookAlert) viewToPage(thisPage); 
	});
	$(document).on('click', '.flag-con .flag-', function() {
		if(bookAlert) {
			var contents = $('<b />').html('이 페이지에 붙힐까요?');
			var flag_sample = $('<div />', {class: 'alert-sample sample-img _active'}).append($('<div />', {class: 'sample-obj flag-'}));
			alert_('.main-book', 'makeFlag', [contents, palette('sample_sib'), flag_sample], true);	
		}
		bookAlert = false;
	});
	
	$(document).on('click', '.page-flag', function(e) {
		if(e.target.className == 'flag-head') return;
		alert_('.main-book', 'deleteFlag', '스티커를 제거할까요?', true);	
		
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
	
	// content plus
	$(document).on('click', '.content-plus .content-plus-', function() {
		var plusCon = $(this).parents('.content-plus');
		
		if(!plusCon.hasClass('_active')) {	
			plusCon.addClass('_active');
		}else {
			plusCon.removeClass('_active');			
		}
	});
	// page plus
	$(document).on('click', '.page-plus ._title', function() {
		var plusCon = $(this).parents('.page-plus');
		var selectCon = $(this).siblings();
		
		if(!plusCon.hasClass('_active')) {	
			plusCon.addClass('_active').css('height', '300px');
			setTimeout(function() {
				selectCon.css('display', 'block');				
			}, 1000);
		}else {
			plusCon.removeClass('_active').css('height', '');
			selectCon.removeAttr('style');
		}
	});
	
	$(document).on('click', '#sel-page', function(e) {
		var editModal = $('<div />', {class: 'modal-con', id: 'edit-modal'});
		var editTool = $('<div />', {class: 'edit-modal- _unsortabled sample_sib', id: 'edit-tool'}).html(palette('axisY _unsortabled'));
		
		bookAlert = false;
		
		var _cover = $('<div />', {class: 'edit-modal- _activable', id: '_p-cover'});
		var _cover_color = $('#p0').css('background-color');
		var _cover_sample = $('<div />', {class: 'sample-obj page-sample'}).css({'position': 'absolute', 'width': '100%', 'height': '100%', 'background-color': _cover_color});
		
		var _cover_spring = $('<div />', {class: 'edit-cover-spring'}).css('background-color', user_.spring);
		var _cover_msg = $('<p />').css({'background-color': 'white', 'text-align': 'center', 'z-index': 5}).html('커버');
		_cover.addClass('_unsortabled sample-img').html([_cover_sample, _cover_spring, _cover_msg]);

		var modalContents = [editTool, _cover];
		
		user_.contents.split(',').forEach(function(item, idx) {
			var _content = '알 수 없음';
			if(item == 'n') {
				_content = '빈 페이지';
				item = $('._empty-page').length;
			}
			else if(item == 'cal') _content = '캘린더';
			else if(item == 'board') _content = '게시판';
			else if(item == 'note') _content = '노트';
			else if(item == 'friend') _content = '친구목록';
			
			var _page = $('<div />', {class: 'edit-modal- _activable', id: '_p-' + item});
			var _page_color = $('#p' + (idx + 1)).css('background-color');
			var _page_sample = $('<div />', {class: 'sample-obj page-sample'}).css({'position': 'absolute', 'width': '100%', 'height': '100%', 'background-color': _page_color});
			
			var _page_msg = $('<p />').css({'background-color': 'white', 'text-align': 'center', 'z-index': 5}).html(_content);
			_page.addClass('_pages sample-img').html([_page_sample, _page_msg]);
			
			if(!isNaN(item)) _page.addClass('_empty-page');

			modalContents.push(_page);
		});

		var plus_page = $('<div />', {class: 'edit-modal- _unsortabled', id: 'plus-page'}).html('+');
		var edit_modal_ok = $('<div />', {class: 'edit-modal-ok _unsortabled'}).html('변경하기');
		modalContents.push(plus_page, edit_modal_ok);
		
		editModal.append(modalContents);
		
		modal_bg('main-book', 'edit-modal');
		mainBook.append(editModal);
		
		$('#edit-modal').sortable({
			items: '._pages:not(._unsortabled, ._unsortabled *)',
			axis: 'x',
			start: function(e, ui) {
				$('#plus-page').css({'border': '4px dashed red', 'color': 'red'}).html('x');
			},
			stop: function(e, ui) {
				$('#plus-page').removeAttr('style').html('+');				
			}
		});
		
		$('#plus-page').droppable({
			drop: function(e, ui) {
				var _thisPage = ui.draggable;
				var _pageContent = _thisPage.find('p').html();
				alert_('.main-book', 'removePage', _pageContent + ' 페이지를 제거할까요?', true, _thisPage.attr('id'));	
			}
		});
		
		$('#plus-page').click(function() {
			var _page_msg = $('<p />').css({'background-color': 'white', 'text-align': 'center', 'z-index': 5}).html('빈 페이지');
			var _page_sample = $('<div />', {class: 'sample-obj'}).css({'position': 'absolute', 'width': '100%', 'height': '100%', 'background-color': '#f5f9e6'});
			
			if($('._pages').length == 10) {
				alert_2('.main-book', '최대 10장까지만 가능합니다.');
				return;
			}
			var newPage = $('<div />', {class: 'edit-modal- _activable _pages sample-img', id: '_p-n'}).html([_page_sample, _page_msg]);
			
			$(this).before(newPage);
		});
		
		$('.edit-modal-ok').click(function() {
			var divs = $(this).parents('#edit-modal').children();
			var _contents = [];
			var _colors = [];
			var _data = [];
			
			divs.each(function(idx, item) {
				if(item.classList) {
					if(item.classList.contains('_activable')) {
						var _contentName = item.id.slice(3);
						if(!isNaN(_contentName)) _contentName = 'n';
						_contents.push(_contentName);						

						item.childNodes.forEach(function(_item) {
							if(_item.classList) {
								if(_item.classList.contains('page-sample')) {
									_colors.push((idx - 1) + rgbTohex(_item.style.backgroundColor));							
								}
							}
						});
					}
				}
			});
			
			_contents.forEach(function(item, idx) {
				_data.push(item + '_' + _colors[idx]);
			});
			
			alert_('.main-book', 'editPage', '저장하시겠습니까?', true, _data.join(','));
			
		});
		
	});
	
	$(document).on('mousedown', '#edit-modal ._activable', function(e) {
		$('#edit-modal ._activable').removeClass('_active');
		if(e.target.className == 'edit-cover-spring') {
			$('.page-sample').removeClass('sample-obj');
			$('.edit-cover-spring').addClass('sample-obj');
		}else {
			$('.edit-cover-spring').removeClass('sample-obj');
			$('.page-sample').addClass('sample-obj');
		}
		$(this).addClass('_active');
	});
	
	viewToPage(currentPage);
});


// login
function loginModal() {
	var mainBook = $(".main-book");
	
	if(mainBook.find(".login-modal").length == 0) {
		var modal = tagCon('div', {'id':'logIn', 'class': 'login-modal modal-con'});
		var formTag = tagCon('form', {'action': 'login', 'method': 'post', 'onsubmit': 'return form_submit();'});
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
		
		
		modal_bg("main-book", 'logIn');
		mainBook.append(modal);

	}
	else {
		modal_bg("main-book", 'logIn', false);
		mainBook.find(".login-modal").remove();
	}
}

$(document).on('keyup', '#userKey', function() {
	var data = $(this).val();
	if(data.length > 3) {
		aJax_('whoIsIt', {it: data, is: 'userKey'}, (data) => {
			if(data && data.length!=0) {
				$('#makeKey').attr('href', '#').html('아, 키를 찾았어요 !');
				$('#key-in').css('display', '');
			}else {
				$('#makeKey').attr('href', 'sign').html('열쇠가 없으신가요?');
			}
		});
	} else {
		$('#makeKey').attr('href', 'sign').html('열쇠가 없으신가요?');
	}
});
$(document).on('keyup', '#cover-name', function(e) {
	var data = $(this).val();
	if(e.key == 'Enter') {
		console.log('enter !');
		$(this).blur();
		if(data.length == 0) alert_('.main-book', 'insertCoverTitle','제목을 지우시겠습니까?', true);
		else alert_('.main-book', 'insertCoverTitle', '제목을 "' + data + '"(으)로 바꾸시겠습니까?', true);
	}else if(e.key == 'Backspace') {
		if(data.length == 0) $('#p0 b').html($(this).attr('data-b'));
	}else {
		$('#p0 b').html(data);
	}
	
})

$(document).on('click', '#p0 b', function(e) {
	if(user_.userKey && $('#cover-name').length == 0) {
		var _input = $('<input />', {type: 'text', class: 'page-out-modal', id: 'cover-name', placeholder: '제목을 입력하세요 !(바꾸시려면 엔터)', 'data-b': $(this).html()});
		_input.css({height: '50px', width: '200px', 'border-radius': '20px', position: 'absolute', left: 'calc(50% - 100px)', 'text-align': 'center', bottom: '150px', 'z-index': 16});
		mainBook.append(_input);
	}else {
		if(e.target.id != 'cover-name') {
			$(this).html($('#cover-name').attr('data-b'));
			$('#cover-name').remove();
		}
	}
});
	
$(document).on('click', '#palette-doc', function(e) {
	var sample = $(this).parents('.sample_sib').siblings('.sample-img._active');
	var bro = $(this).siblings();
	var _randomColor = randomColor();
	
	$(this).css('background', _randomColor);
	sample.find('.sample-obj').css('background', _randomColor);
	
	bro.find('*').remove();
	bro.css('background', '');
	
});
$(document).on('click', '#palette-pick', function(e) {
	if($('#palette-pick-picker').length == 0) {
		$(this).append($('<div />', {id: 'palette-pick-picker'}));
		colorPickerRender();
	}else {
		if(e.target.id == 'palette-pick') {
			$('#palette-pick-picker').remove();
		}
	}
});

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
	
	if(data.alertId == '_alert') {
		bookAlert = true;
		
	}  else if(data.alertId == 'makeFlag') {
		bookAlert = true;
		var flagList = [];
		
		$('.flag-head').each(function() {
			flagList.push($(this).attr('data-page') * 1);
		});
		
		if(flagList.includes(currentPage)) {
			alert_('.main-book', '_alert', '이미 붙혀있습니다.', false);
			return;
		} else if(currentPage == 0 || currentPage == finalPage + 1) {
			alert_('.main-book', '_alert', '해당 페이지는 붙힐 수 없습니다.', false);
			return;
		} else {
			flagList.push(currentPage);
		}
		
		flagList.sort(function(a, b) {
			return a - b;
		});
		
		var sample_color = $('#makeFlag').find('.sample-obj').css('background-color');
		
		var flagColor = {};
		if(user_.flag && user_.flag!='') {
			user_.flag.split(',').forEach(function(item, idx) {
				var _flagNo = item.slice(0, 1) * 1;
				var _flagColor = item.slice(1);
				
				flagColor[_flagNo] = _flagColor;
			});		
		}
		if(sample_color && sample_color.length!=0) flagColor[currentPage] = rgbTohex(sample_color);
		
		if(flagColor && flagColor!={}) {
			var flagColors = '';
			$.each(flagColor, function(key, value) {
				flagColors += key + value + ',';
			});
			
			flagColors = flagColors.slice(0, -1);			
		}
		
		aJax_('setCustom', {'flagList': flagList.join(','), 'flag': flagColors}, function(data) {
			if(data) {
				var event = $.Event('flagRender', {flagList: flagList.join(','), flag: flagColors});
				$('body').trigger(event);
			}else {
				alert_('.main-book', '_alert', '다시 시도해주세요 ..', false);
			}
		});
	}else if(data.alertId == 'deleteFlag') {
		var flagList = user_.flagList.split(',');
		var flagColor = user_.flag.split(',');
		
		var idx = flagList.indexOf('' + currentPage);
		flagList.splice(idx, 1);
		
		var flagColors = '';
		flagColor.map(function(idxColor) {
			if(!idxColor.startsWith(currentPage)) {
				flagColors += idxColor + ',';
			}
		});
		flagColors = flagColors.slice(0, -1);

		aJax_('setCustom', {'flagList': flagList.join(','), 'flag': flagColors}, function(data) {
			if(data) {
				var event = $.Event('flagRender', {flagList: flagList.join(','), 'flag': flagColors});
				$('body').trigger(event);
			}else {
				alert_('.main-book', '_alert', '다시 시도해주세요 ..', false);
			}
		});
		
	} else if(data.alertId == 'insertCoverTitle') {
		var coverTitle = $('#cover-name').val();
		
		if(coverTitle.length > 20) {
			alert_('.main-book', '_alert', '제목은 20자 이하만 사용가능합니다.', false);
			return;
		}
		aJax_('setCustom', {'coverTitle': coverTitle}, function(data) {
			if(data) {
				alert_('.main-book', '_alert', '적용되었습니다 !', false);
				$('#cover-name').remove();
			}else {
				alert_('.main-book', '_alert', '다시 시도해주세요 ..', false);
			}
		});
	} else if(data.alertId == 'pagePlus') {
		var pageContents = user_.contents + ',n';
		aJax_('setCustom', {'contents': pageContents}, function(data) {
			if(data) {
				alert_('.main-book', '_alert', '추가되었습니다 !', false);
				var event = $.Event('pageRender', {contents: pageContents});
				$('body').trigger(event);
			}else {
				alert_('.main-book', '_alert', '다시 시도해주세요 ..', false);
			}
		});	
	} else if(data.alertId == 'removePage') {
		var _alert = $('#' + data.alertId);
		var _removePage = _alert.find('.alert-content').html().slice(0, 1) * 1;
		var _modal = $('#edit-modal');
		
		_modal.find('#_p' + _removePage).remove();
	} else if(data.alertId == 'editPage') {
		var _alert = $('#' + data.alertId);
		var _data = _alert.attr('data-a').split(',');
		var _contents = [];
		var _colors = [];
		var _cover = '';
		var _spring = rgbTohex($('.edit-cover-spring').css('background-color'));
		
		_data.forEach(function(item, idx) {
			var _d = item.split('_');
			if(_d[0] == 'cover') {
				_cover = _d[1];
			} else {
				_contents.push(_d[0]);
				_colors.push(_d[1]);				
			}
		});
		
		var fd = contentToPage(_contents);
		
		var _data_ = {'contents': _contents.join(','), 'spring': _spring, 'cover': _cover, 'page': _colors.join(','), 'flagList': fd[0].join(','), 'flag': fd[1].join(',')};
		console.log(_data_);
		aJax_('setCustom', _data_, function(data) {
			if(data) {
				alert_('.main-book', '_alert', '변경되었습니다 !', false);
				var event = $.Event('pageRender', _data_);
				$('body').trigger(event);
			}else {
				alert_('.main-book', '_alert', '다시 시도해주세요 ..', false);
			}
		});
		
	}
	removModal($('#' + data.alertId).attr('data-modal'), data.alertId);
});

$('body').on('alertCancel', function(data) {
	if(data.loc == 'main-book') {
		bookAlert = true;
	}
});

// reRender
$('body').on('pageRender', function(data) {
	location.reload();
//	if(data.contents && data.contents.length!=0) user_.contents = data.contents;
//	if(data.page && data.page.length!=0) user_.page = data.page;
//	if(data.flagList && data.flagList.length!=0) user_.flagList = data.flagList;
//	if(data.flag && data.flag.length!=0) user_.flag = data.flag;
//	$('body').off('allRenderSuccess');
//	allRender(user_);
});

$('body').on('flagRender', function(data) {
	if(data.flagList && data.flagList.length!=0) user_.flagList = data.flagList;
	if(data.flag && data.flag.length!=0) user_.flag = data.flag;
	flagRender(user_.flagList, user_.flag);
});