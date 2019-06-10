import { h, render } from "preact";
import { WorldWeather } from "./world-weather/world-weather";
import { WorldWeatherController } from "./world-weather/world-weather-controller";

let controller = new WorldWeatherController();

render(<WorldWeather controller={controller}/>, document.getElementsByTagName("WorldWeather").item(0));
