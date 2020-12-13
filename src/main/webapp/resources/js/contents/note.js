export class Note {
	constructor(place) {
		var noteEl = $('<form />', {
			action: '#',
			method: 'post'
		}).html($('<textarea />', {class: 'summernote', name: 'editordata'}));
		
		place.append(noteEl);
		
		$('.summernote').summernote({
			  height: 300,
			  minHeight: null,
			  maxHeight: null,
			  focus: true,
			  lang: "ko-KR",
			  placeholder: '최대 2048자까지 쓸 수 있습니다'          
		});
		
	}
}