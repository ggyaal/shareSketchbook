export class palette {
	constructor(list) {
		this._palette = $('<div />', {id: '_palette'});
		this._colorPicker = $(',div />', {id: '_palette-color', class: '_palette-color'});
		this._cutomColor1 = $(',div />', {id: '_palette-cust-1', class: '_palette-color'}).css('background-color', list.palette1);
		this._cutomColor2 = $(',div />', {id: '_palette-cust-2', class: '_palette-color'}).css('background-color', list.palette2);;
		this._cutomColor3 = $(',div />', {id: '_palette-cust-3', class: '_palette-color'}).css('background-color', list.palette3);;
		
		this._palette.append([this._cutomColor1, this._cutomColor2, this._cutomColor3, this._colorPicker]);
	}
	
	
}