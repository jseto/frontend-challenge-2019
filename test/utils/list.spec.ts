import { List } from "../../src/utils/list";

interface Items {
	key: string;
}

describe( 'List', ()=>{
	let a = { key: 'a' };
	let b = { key: 'b' };
	let c = { key: 'c' };
	let d = { key: 'd' };
	let e = { key: 'e' };
	let z = { key: 'z' };

	let initialData = [ a, b, c, d, e ];
	let l: List<Items>;

	beforeEach(()=>{
		l = new List( initialData );
	});

	it( 'should accept initial data', ()=>{
		expect( l.length ).toBe( initialData.length );
	})

	it( 'should insert element on empty data', ()=>{
		l = new List<Items>();
		l.push( z );
		expect( l.length ).toBe( 1 );
		expect( l.items[0] ).toBe( z );
	})

	it( 'should insert element', ()=>{
		l.push( z );
		expect( l.length ).toBe( initialData.length + 1 );
		expect( l.items.indexOf(z) ).toBeGreaterThanOrEqual( 0 );
	})

	it( 'should not throw on delete item on empty list', ()=>{
		l = new List<Items>();
		l.delete( z );
		expect( l.length ).toBe( 0 );
	})

	it( 'should do nothing on delete inexisten item', ()=>{
		l.delete( z )
		expect( l.length ).toBe( initialData.length );
	})

	it( 'should compare 2 lists regarless of sort order', ()=>{
		l = new List([ c, a, d, e, b ] );
		expect( l.equal( initialData ) ).toBeTruthy();

		l = new List([ c, a, z, e, b ] );
		expect( l.equal( initialData ) ).toBeFalsy();

		l = new List([ c, a, e, b ] );
		expect( l.equal( initialData ) ).toBeFalsy();
	})

	it( 'should compare 2 lists and have same sort order', ()=>{
		l = new List([ a, b, c, d, e ] );
		expect( l.isClone( initialData ) ).toBeTruthy();

		l = new List([ c, a, d, e, b ] );
		expect( l.isClone( initialData ) ).toBeFalsy();

		l = new List([ c, a, z, e, b ] );
		expect( l.isClone( initialData ) ).toBeFalsy();

		l = new List([ c, a, e, b ] );
		expect( l.isClone( initialData ) ).toBeFalsy();
	})



	describe( 'swap', ()=>{
		it( 'should swap items', ()=>{
			l.swap( b, 2 );
			expect( l.items[1] ).toBe( initialData[3] );

			l.swap( d, -2 );
			expect( l.items[3] ).toBe( initialData[1] );
		})

		it( 'should work on extreme items', ()=>{
			l.swap( a, 4 );
			expect( l.items[ 4 ] ).toBe( initialData[0] );

			l.swap( e, -4 );
			expect( l.items[ 4 ] ).toBe( initialData[0] );
		})

		it( 'should do nothing on operations done out of boundaries', ()=>{
			l.swap( a, -1 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.swap( e, 1 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.swap( z, 1 );
			expect( l.isClone( initialData ) ).toBeTruthy();
		})
	})

	describe( 'Move', ()=>{
		it( 'should move head item', ()=>{
			l.move( a, 3 );
			expect( l.items[0] ).toBe( b );
			expect( l.items[3] ).toBe( a );
		})

		it( 'should move central item', ()=>{
			l.move( d, 1 );
			expect( l.items[1] ).toBe( d );
			expect( l.items[3] ).toBe( c );
		})

		it( 'should move tail item', ()=>{
			l.move( e, 2 );
			expect( l.items[2] ).toBe( e );
			expect( l.items[4] ).toBe( d );
		})

		it( 'should work on extreme items', ()=>{
			l.move( a, 0 );
			expect( l.isClone( initialData ) ).toBeTruthy();


			l.move( e, 4 );
			expect( l.isClone( initialData ) ).toBeTruthy();
		})

		it( 'should do nothing on operations done out of boundaries', ()=>{
			l.move( a, -1 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.move( e, 5 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.move( c, 5 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.move( c, -1 );
			expect( l.isClone( initialData ) ).toBeTruthy();

			l.move( z, 1 );
			expect( l.isClone( initialData ) ).toBeTruthy();
		})
	})
})
