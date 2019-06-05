import { h, render } from "preact";
import { WorldWeather } from "./world-weather";

render(<WorldWeather />, document.getElementsByTagName("WorldWeather").item(0));
