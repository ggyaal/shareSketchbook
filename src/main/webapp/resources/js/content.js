import {
	Calendar
} from './contents/calendar.js';

class Contents {
	constructor(list) {
		this.list = list || ['cal'];
		
	}
	
	render() {
		this.list.forEach(function(item, idx) {
			if(item == 'cal') new Calendar($('#p' + (idx + 1)).find('.page-content'));
		})
	}
}

$(function(){
	const contents = new Contents();
	contents.render();
	
})