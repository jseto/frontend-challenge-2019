import { UnitConverter } from "../src/utils/unit-converter";


describe( 'Unit conversion', ()=>{
	it( 'should convert kelvin to Celsius', ()=>{
		expect( UnitConverter.toCelsius( 0 ) ).toEqual( -272 );
	})

	it( 'should convert kelvin to Fahrenheit', ()=>{
		expect( UnitConverter.toFahrenheit( 0 ) ).toEqual( -460 );
		expect( UnitConverter.toFahrenheit( 272.15 ) ).toEqual( 30 );
		expect( UnitConverter.toFahrenheit( 400 ) ).toEqual( 260 );
	})

	it( 'should convert speed to mph', ()=>{
		expect( UnitConverter.toMPH( 1 ) ).toEqual( 2.24 );
		expect( UnitConverter.toMPH( 2.4 ) ).toEqual( 5.37 );
	})

	it( 'should convert m to inches', ()=>{
		expect( UnitConverter.toInches( 1 ) ).toEqual( 0.039 );
		expect( UnitConverter.toInches( 2.4 ) ).toEqual( 0.094 );
	})
})
