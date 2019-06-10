export class List< T > {
	constructor( items: T[] = [], onChange?: ( list:T[] ) => void ) {
		this._list = [...items];
		this._onChange = onChange;
	}

	push( item: T ) {
		this._list.push( item );
		this._onChange && this._onChange( this._list )
	}

/**
 * Swaps the position of 2 elements in the list
 * @param  item     one of the items to swap
 * @param  distance a relative index pointing to the element to swap with item
 * @return          the replaced element wich was at distance of item
 */
	swap( item: T, distance: number ): T {
		const pos = this._list.indexOf( item );
		const dest = pos + distance;

		if ( pos < 0 || dest < 0 || dest >= this.length ) return null;

		this._list[ pos ] = this._list[ dest ];
		this._list[ dest ] = item;
		this._onChange && this._onChange( this._list )
		return this._list[ pos ];
	}

	move( item: T, pos: number ) {
		let i = this._list.indexOf( item );
		if ( i < 0 || pos < 0 || pos >= this.length ) return;

		this._list.splice( pos, 0, this._list.splice( i, 1 )[0] );
		this._onChange && this._onChange( this._list )
	}

	delete( item: T ) {
		const pos = this._list.indexOf( item );
		if ( pos >= 0) {
			this._onChange && this._onChange( this._list )
			return this._list.splice( pos, 1 )[0];
		}
		return null;
	}

	map<U>( cb: ( value: T, index?: number, arr?: T[] ) => U, thisArg?: any ): U[] {
		return this._list.map( cb, thisArg );
	}

	sort( cb?: ( a: T, b: T ) => number ) {
		return this._list.sort( cb );
	}

	get items() {
		return this._list;
	}

	get length() {
		return this._list.length;
	}

	/**
	 * Compares a list for ono to one element equality including sort order
	 * @param  listToCompare list to compare
	 * @return               true if both lists have the same elements in the same order
	 */
	isClone( listToCompare: T[] ) {
		if ( this.length != listToCompare.length ) return false;

		let isEqual = true;
		let i = 0;
		while (isEqual && i < this.length ) {
			isEqual = this._list[i] === listToCompare[i];
			i++;
		}

		return isEqual;
	}

	/**
	 * Compares a list with this one for element equality regarless of its element order
	 * @param  listToCompare list to compare
	 * @return               true if both lists contain the same elements
	 */
	equal( listToCompare: T[] ) {
		if ( this.length != listToCompare.length ) return false;

		let isEqual = true;

		this._list.forEach( (innerItem: T) => isEqual = ( isEqual && ( listToCompare.indexOf( innerItem ) >= 0 ) ) );

		return isEqual;
	}

	find( equal: ( a: T ) => boolean ) {
		return this._list.find( equal );
	}

	private _list: T[];
	private _onChange: (list: T[]) => void;
}
