import "../scss/main.scss";
import { h, render } from "preact";
import { WorldWeather } from "./world-weather/world-weather";
import { WorldWeatherController } from "./world-weather/world-weather-controller";
import { Mapbox } from "./places-apis/mapbox";

let controller = new WorldWeatherController( new Mapbox() );

render(<WorldWeather controller={controller}/>, document.getElementsByTagName("WorldWeather").item(0));
