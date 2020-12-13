export class Calendar {
	constructor(place) {
		var calendarEl = $("<div />", {
			id: 'calendar'
		});
		
		place.append(calendarEl);
		
		var calendar = new FullCalendar.Calendar(calendarEl[0], {
			timeZone: 'UTC',
			locale: 'ko',
			contentHeight: 600,
			initialView: 'dayGridMonth',
			events: 'https://fullcalendar.io/demo-events.json',
			editable: true,
			selectable: true
		});
		
		calendar.render();
	}
}