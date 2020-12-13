import {
	Calendar
} from './contents/calendar.js';

import {
	Note
} from './contents/note.js';

class Contents {
	constructor(list) {
		this.list = list || ['profile', 'cal', 'board', 'friend', 'note'];
		
	}
	
	render() {
		this.list.forEach(function(item, idx) {
			if(item == 'cal') new Calendar($('#p' + (idx + 1)).find('.page-content'));
			else if(item == 'note') new Note($('#p' + (idx + 1)).find('.page-content'));
		})
	}
}

$('body').on('pageRenderSuccess', function() {
	var list;
	if(user_.contents) list = user_.contents.split(',');
	const contents = new Contents(list);
	contents.render();
	
});