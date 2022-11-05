import {
    fahrenheit,
    celsius
} from "./tempConvert.js";
var DateTime = luxon.DateTime;

export function displayForecast(data, id, toggleTemp, toggleForecast) {
    let cardId = document.querySelectorAll('.card span')
    let stringDate = ''
    let tempString = ''
    let adjustedImg, descText
    let parent
    let spanDeg = ''
    //Clear card

    for (let i = 0; i < cardId.length; i++) {
        if (id === cardId[i].id) {
            parent = cardId[i].parentElement
            parent.textContent = ''

            let h2 = document.createElement('H2')
            h2.textContent = data.city.name
            parent.appendChild(h2)

            let spanClose = document.createElement('SPAN')
            spanClose.classList.add('close')
            spanClose.textContent = 'x'
            parent.appendChild(spanClose)
            spanClose.setAttribute('id', id)
        }
    }

    // Grab data

    for (let i = 0; i < data.list.length;) {
        let getWeather = data.list[i + 8 - 2]

        // Date
        let getDate = getWeather.dt_txt.substr(0, 10)
        let date = DateTime.fromISO(`${getDate}`).toFormat('cccc')
        let dateTwo = DateTime.fromISO(`${getDate}`).toFormat('dd')
        stringDate = date + " " + dateTwo

        // Temperature 
        if (toggleTemp === true) {
            console.log('temp')
            let f = Math.floor(fahrenheit(getWeather.main.temp))
            tempString = f
            spanDeg = '°F'
        } else {
            console.log('cel')
            let c = Math.floor(celsius(getWeather.main.temp))
            tempString = c
            spanDeg = '°C'
        }

        // Weather Image and Description

        if (getWeather.weather[0].main === 'Clear') {
            adjustedImg = 'Weather Images/day/clear-day.gif'
            descText = `${getWeather.weather[0].description[0].toUpperCase() + getWeather.weather[0].description.slice(1).toLowerCase()}`
        } else if (getWeather.weather[0].main === 'Clouds') {
            adjustedImg = 'Weather Images/day/cloudy-day.gif'
            descText = `${getWeather.weather[0].description[0].toUpperCase() + getWeather.weather[0].description.slice(1).toLowerCase()}`
        } else if (getWeather.weather[0].main === 'Snow') {
            adjustedImg = 'Weather Images/day/snow-day.gif'
            descText = `${getWeather.weather[0].description[0].toUpperCase() + getWeather.weather[0].description.slice(1).toLowerCase()}`
        } else if (getWeather.weather[0].main === 'Rain') {
            adjustedImg = 'Weather Images/day/rainy-day.gif'
            descText = `${getWeather.weather[0].description[0].toUpperCase() + getWeather.weather[0].description.slice(1).toLowerCase()}`
        }

        let div = document.createElement('div')
        let pOne = document.createElement('P')
        let pTwo = document.createElement('P')
        let spanDegText = document.createElement('SPAN')
        let pThree = document.createElement('P')
        let divTwo = document.createElement('DIV')
        let img = document.createElement('IMG')
        let divThree = document.createElement('DIV')

        div.classList.add('day')
        parent.classList.add('forecasting')
        divTwo.classList.add('weatherDesc')
        pOne.textContent = stringDate
        pOne.classList.add('weekday')
        pTwo.textContent = tempString
        spanDegText.textContent = spanDeg
        pTwo.classList.add('foreTemp')
        pThree.textContent = descText
        pThree.classList.add('forecastDesc')
        divThree.classList.add('foreImg')
        img.src = adjustedImg

        div.appendChild(pOne)
        pTwo.appendChild(spanDegText)
        divTwo.appendChild(pTwo)
        divTwo.appendChild(pThree)
        div.appendChild(divTwo)
        divThree.appendChild(img)
        div.appendChild(divThree)
        parent.appendChild(div)
        i = i + 8
    }
}