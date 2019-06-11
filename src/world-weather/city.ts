export interface Location {
	latitude: number;
	longitude: number;
}

export class City {

	setCode( code: string ) {
		this._code = code;
		return this;
	}

	get code() {
		return this._code
	}

	setName( name: string ) {
		this._name = name;
		return this;
	}

	get name() {
		return this._name;
	}

	setPlaceName( name: string ) {
		this._placeName = name;
		return this;
	}

	get placeName() {
		return this._placeName;
	}

	setLocation( value: Location ) {
		this._location = value;
		return this;
	}

	get location() {
		return this._location;
	}

	private _code: string;
	private _name: string;
	private _placeName: string;
	private _location: Location;
}
