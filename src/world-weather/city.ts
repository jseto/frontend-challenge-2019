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

	private _code: string;
	private _name: string;
}
