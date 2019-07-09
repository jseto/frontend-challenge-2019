# LivingOS: Frontend challenge

## Comments from applicant

[![Maintainability](https://api.codeclimate.com/v1/badges/462ccecfc048c7bb9232/maintainability)](https://codeclimate.com/github/jseto/frontend-challenge-2019/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/462ccecfc048c7bb9232/test_coverage)](https://codeclimate.com/github/jseto/frontend-challenge-2019/test_coverage)
[![](https://img.shields.io/badge/deploy-last%20version-green.svg)](https://jseto.github.io/frontend-challenge-2019/)
[![Build Status](https://travis-ci.org/jseto/frontend-challenge-2019.svg?branch=master)](https://travis-ci.org/jseto/frontend-challenge-2019)


The quality of this project is being monitored with CodeClimate. You can access the project metrics by clicking on the badges above.

The choosed framework is Preact. Preact is a isomorphic library to React but with a smaller footprint of about 3Kb. I choosed to use it because I think to build a widget you don't want to fill your whole application with an extra 100Kb of React. Everything in Preact is on React, so you can easily move to React in case you need.

The widget is divided in a view layer and a controller. Controller holds all the business logic of the application. Therefore, if you want to change the view layer, lets say want to use Vue, you can do and still use the old logic with the non coupled tests for the controller.

This introduces a bit of overhead in the widget but, being this and aptitude test, I thought it was better to show off a litle bit.

The view layer is composed by a reusable couple of components; MasterView-DetailView.

DetailView can show any html code passed as children so you can easily customize the detail view presentation without touching DetailView component.

The project implements CI with Travis. Travis checks that tests are passed smoothly and if so, the widget is deployed to github pages in the gh-pages branch. You can check the live widget [here](https://jseto.github.io/frontend-challenge-2019/)

Thanks for your attention

# Original ReadMe

Hi, all applicants if you are interested in this job. We would like to test your coding skills.

If you can implement our assignment, regardless of your qualifications or how many years of experience you have, we will contact you for the next steps of the interview process.

We'd like you to develop a web application for weather, which can show the current weather from anywhere in the world.

## Design Guideline
This is just a guideline. You can adjust or totally redesign it.

![Screenshot](/img/example.jpg)


## Features
 - Responsive design.
 - Searching box provides a suggestion list when user types an input box.
 - Managing city in the list.
 - List all city which user selected with currently average temperature data.
 - User can config the temperature unit system e.g. Kelvin, Fahrenheit, Celsius.
 - Building page or popup to show these informations.
	 - Average temperature.
	 - Min/Max temperature.
	 - Weather icon.
	 - Weather main e.g. Rain Snow, Sunny.
	 - Weather description.
	 - Wind speed.
	 - Humidity.
	 - Pressure.
	 - Rain volume.
	 - Showing 24 hours forecast.
 - Glad to see any extra idea and feature is a big plus.

## Datasource
**OpenWeather API**

[https://openweathermap.org/api](https://openweathermap.org/api)

**Weather icons**

[https://openweathermap.org/weather-conditions](https://openweathermap.org/weather-conditions)

**Places API**

[https://geoawesomeness.com/google-maps-api-alternatives-best-cheap-affordable/](https://geoawesomeness.com/google-maps-api-alternatives-best-cheap-affordable/)

You can choose any Places API as your datasource.

## Technology expectations
- Choosing one of these frameworks: **Angular**, **Vue** or **React**.
- Good code structure and clean code.
- You can use any tools to develop it's up to you.
- Testing is a must.
- Docker is a plus.
- Typescript is a plus.

## How to submit
Fork this repository and send your repo to hireme@thelivingos.com when you're done an assignment.

## Contact
if you have any further questions, please feel free to contact us on hireme@thelivingos.com
