import {
    fahrenheit,
    celsius
} from "./tempConvert.js"

import {
    displayWeatherList
} from "./displayWeather.js"

import {
    displayForecast
} from "./displayForecast.js"

const input = document.querySelector('input')
const submit = document.querySelector('#submit')
const cardSection = document.querySelector('#cardSection')
const farButton = document.querySelector('#far')
const celButton = document.querySelector('#cel')
const API_KEY = 'c16a7f781343ddf99232cd59e9327733'

let cardList = []
let count = 0
let cardObj = {}
let toggleTemp = true
let toggleForecast = false

async function getWeather(locationInput) {
    try {
        if (isNaN(locationInput)) { //input is string
            //grab longitude & latitude
            let locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&appid=${API_KEY}`);
            let locationData = await locationResponse.json();
            let latitude = locationData[0].lat
            let longitude = locationData[0].lon

            //use logitude & latitude to get weather data
            let weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            let weatherData = await weatherResponse.json()

            let fDeg = fahrenheit(weatherData.main.temp)
            let cDeg = celsius(weatherData.main.temp)

            //adjust picture and weather text
            let adjustedImg, descText

            if (weatherData.weather[0].main === 'Clear') {
                adjustedImg = 'Weather Images/day/clear-day.gif'
                descText = `${weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1).toLowerCase()}`
            } else if (weatherData.weather[0].main === 'Clouds') {
                adjustedImg = 'Weather Images/day/cloudy-day.gif'
                descText = `${weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1).toLowerCase()}`
            } else if (weatherData.weather[0].main === 'Snow') {
                adjustedImg = 'Weather Images/day/snow-day.gif'
                descText = `${weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1).toLowerCase()}`
            } else if (weatherData.weather[0].main === 'Rain') {
                adjustedImg = 'Weather Images/day/rainy-day.gif'
                descText = `${weatherData.weather[0].description[0].toUpperCase() + weatherData.weather[0].description.slice(1).toLowerCase()}`
            }

            if (toggleTemp === true) {
                cardObj = {
                    city: locationData[0].name,
                    temp: fDeg,
                    img: adjustedImg,
                    desc: descText,
                    id: count++,
                    toggle: true
                }
            } else {
                cardObj = {
                    city: locationData[0].name,
                    temp: cDeg,
                    img: adjustedImg,
                    desc: descText,
                    id: count++,
                    toggle: false
                }
            }
            cardList.push(cardObj)
            displayWeatherList(cardList)

    }
    } catch (error) {
        console.error(error);
    }

}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    getWeather(input.value)
})

//close button
cardSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        e.target.parentElement.remove()
        for (let i = 0; i < cardList.length; i++) {
            if (cardList[i].id === Number(e.target.id)) {
                cardList.splice(i, 1)
            }
        }
    }
})

//toggle fahrenheit/ celsius buttons
farButton.addEventListener('click', () => {
    if (!toggleTemp === true) {
        toggleTemp = true
        celButton.style.color = 'white'
        farButton.style.color = '#fec936'
        for (let i = 0; i < cardList.length; i++) {
            cardList[i].toggle = toggleTemp
            cardList[i].temp = cardList[i].temp * (9 / 5) + 32
        }

        if (toggleForecast === false) {
            displayWeatherList(cardList)
        } else {
            let foreTemp = document.querySelectorAll('.foreTemp')
            for (let i = 0; i < foreTemp.length; i++) {
                let degIndex = foreTemp[i].textContent.indexOf('°')
                let currentTemp = foreTemp[i].textContent.substring(0, degIndex)
                let newF = Math.round(Number(currentTemp) * (9 / 5) + 32)
                foreTemp[i].innerHTML = `${newF}<span>°F</span>`
            }
        }
        
    }
})

celButton.addEventListener('click', () => {
    if (!toggleTemp === false) {
        toggleTemp = false
        farButton.style.color = 'white'
        celButton.style.color = '#fec936'
        for (let i = 0; i < cardList.length; i++) {
            cardList[i].toggle = toggleTemp
            cardList[i].temp = (cardList[i].temp - 32) * 5 / 9
        }

        if (toggleForecast === false) {
            displayWeatherList(cardList)
        } else {
            let foreTemp = document.querySelectorAll('.foreTemp')
            for (let i = 0; i < foreTemp.length; i++) {
                let degIndex = foreTemp[i].textContent.indexOf('°')
                let currentTemp = foreTemp[i].textContent.substring(0, degIndex)
                let newC = Math.round((Number(currentTemp) - 32) * 5 / 9)
                foreTemp[i].innerHTML = `${newC}<span>°C</span>`
            }
        }
    }
})

//forecast data

async function forecast(locationInput, id, toggleForecast) {
    let locationResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${locationInput}&appid=${API_KEY}`);
    let locationData = await locationResponse.json();
    let latitude = locationData[0].lat
    let longitude = locationData[0].lon

    let weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    let weatherData = await weatherResponse.json()

    displayForecast(weatherData, id, toggleTemp, toggleForecast)
}

//toggle to forecast information
cardSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('card')) {
        if (!e.target.classList.contains('forecasting')) {
            console.log("1")
            forecast(e.target.firstChild.innerHTML, e.target.firstChild.nextSibling.id, toggleForecast)
        } else {
            console.log("2")
            e.target.classList.remove('forecasting')
            let id = e.target.querySelector(`span`).id
            displayWeatherList(cardList, id)
        }
    } 
    // else if (e.target.classList.contains('forecastButton')) {
    //     if (!e.target.classList.contains('forecasting')) {
    //         console.log("3")
    //         forecast(e.target.parentElement.firstChild.innerHTML, e.target.parentElement.firstChild.nextSibling.id, toggleForecast)
    //     } else {
    //         console.log("4")
    //         e.target.classList.remove('forecasting')
    //         let id = e.target.querySelector(`span`).id
    //         displayWeatherList(cardList, id)
    //     }
    // }
})
