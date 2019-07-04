import { h } from "preact";
import { City, WeatherState } from "./city";
import { UnitConverter } from "../utils/unit-converter";
import { AnimatedPanel, AnimatedPanelProps } from "../utils/frontend/animated-panel";

export interface CityViewProps extends AnimatedPanelProps {
	city: City;
	activatePanel?: () => void;
	units: 'imperial' | 'international';
}

export class CityView extends AnimatedPanel<CityViewProps> {
	render() {
		const city = this.props.city;
		const tempSym = UnitConverter.getMeasureUnit( 'temperature', this.props.units === 'imperial' );
		const weather = UnitConverter.getConvertedMeasures( this.props.city.weatherData, this.props.units === 'imperial' );

		return (
			<div className="city-view">
				<div className="accordion-header flex-box">
					<div  className="header-city-name clickable" onClick={ ()=>this.props.activatePanel() }>
						<h2>{city.name}</h2>
					</div>
					<div className="heder-data">
						<img src={`http://openweathermap.org/img/w/${city.weatherData.icon}.png`}></img>
					</div>
					<div className="header-data dim-color">
						<h3>{ weather.temp.current }{tempSym}</h3>
					</div>
				</div>
				<div className="panel-content accordion-panel" style={ { maxHeight: this.getAccordionPanelHeight() } }>
					{ this.renderContent() }
				</div>
			</div>
		);
	}

	private renderContent() {
		const weather = UnitConverter.getConvertedMeasures( this.props.city.weatherData, this.props.units === 'imperial' );
		const tempSym = UnitConverter.getMeasureUnit( 'temperature', this.props.units === 'imperial' );
		const windSym = UnitConverter.getMeasureUnit( 'speed', this.props.units === 'imperial' );
		const presSym = UnitConverter.getMeasureUnit( 'pressure', this.props.units === 'imperial' );
		const rainSym = UnitConverter.getMeasureUnit( 'length', this.props.units === 'imperial' );

		return (
			<div className="city-view-detail flex-box">
				<div style="flex-grow: 1"></div>
				<div style="flex-grow: 1">
					<div className="flex-box vertical-flex">
						<p>Min: { weather.temp.min }{tempSym} Max: { weather.temp.max }{tempSym}</p>
						<h1>{ weather.temp.current }{tempSym}</h1>
						<img src={`http://openweathermap.org/img/w/${ weather.icon }.png`} width="50px"></img>
						<h3>{ weather.weather }</h3>
						<p>{ weather.description }</p>
					</div>
					<div className="weather-details">
						<p>Wind: { weather.wind } {windSym}</p>
						<p>Pressure: { weather.pressure } {presSym}</p>
						<p>Humidity: { weather.humidity }%</p>
						<p>Rain: { weather.rain } {rainSym}</p>
					</div>
					<div className="flex-box">
						{ this.props.city.hourlyWeatherData.slice( 0, 8 ).map( item => this.renderHourlyData( item ) ) }
					</div>
				</div>
				<div style="flex-grow: 1"></div>
			</div>
		);
	}

	private renderHourlyData( data: WeatherState ):JSX.Element {
		const weather = UnitConverter.getConvertedMeasures( data, this.props.units === 'imperial' );

		return (
			<div className="hourly-data">
				<p>{data.time.getHours()}:00</p>
				<img src={`http://openweathermap.org/img/w/${data.icon}.png`}></img>
				<p>{ weather.temp.current }{ UnitConverter.getMeasureUnit('temperature', this.props.units === 'imperial') }</p>
			</div>
		);
	}

}
