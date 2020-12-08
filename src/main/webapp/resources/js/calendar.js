function renderCal(place) {
	var calendarEl = $("<div />", {
		id: 'calendar'
	});
	console.log(calendarEl);
	place.append(calendarEl);
	
	var calendar = new FullCalendar.Calendar(calendarEl[0], {
		timeZone: 'UTC',
		locale: 'ko',
		initialView: 'dayGridMonth',
		events: 'https://fullcalendar.io/demo-events.json',
		editable: true,
		selectable: true
	});
	
	calendar.render();
	
}
console.log($('#p01').find('.page-content'));
renderCal($('#p01').find('.page-content'));