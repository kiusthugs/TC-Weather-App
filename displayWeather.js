const cardSection = document.querySelector('#cardSection')

export function displayWeatherList(data, id) {

    if (id) {
        let grabCard = document.querySelectorAll('.card span') 
        let parent = grabCard[Number(id)].parentElement
        console.log(parent)

        parent.innerHTML = ''

            let h2 = document.createElement('H2')
            let pOne = document.createElement('P')
            let createImg = document.createElement('img')
            let pTwo = document.createElement('P')
            let span = document.createElement('SPAN')
            let forecastDiv = document.createElement('DIV')
        
            pOne.setAttribute('id', 'temperature')
            pTwo.setAttribute('id', 'weatherDesc')
            span.classList.add('close')
            forecastDiv.classList.add('forecastButton')
        
            h2.textContent = data[id].city
            if(data[id].toggle === true) {
                pOne.textContent = `${Math.trunc(data[id].temp)}°F`
            } else {
                pOne.textContent = `${Math.trunc(data[id].temp)}°C`
            }
            
            createImg.src = data[id].img
            pTwo.textContent = data[id].desc
            span.textContent = 'x'
            span.setAttribute('id', data[id].id)
        
            parent.appendChild(h2)
            parent.appendChild(span)
            parent.appendChild(pOne)
            parent.appendChild(createImg)
            parent.appendChild(pTwo)
            parent.appendChild(forecastDiv)

        return
    }

    cardSection.innerHTML = ''
    
    for (let i = 0; i < data.length; i++) {

    let div = document.createElement('DIV')
    div.classList.add('card')
    let h2 = document.createElement('H2')
    let pOne = document.createElement('P')
    let createImg = document.createElement('img')
    let pTwo = document.createElement('P')
    let span = document.createElement('SPAN')
    let forecastDiv = document.createElement('DIV')

    pOne.setAttribute('id', 'temperature')
    pTwo.setAttribute('id', 'weatherDesc')
    span.classList.add('close')
    forecastDiv.classList.add('forecastButton')

    h2.textContent = data[i].city
    if(data[i].toggle === true) {
        pOne.textContent = `${Math.trunc(data[i].temp)}°F`
    } else {
        pOne.textContent = `${Math.trunc(data[i].temp)}°C`
    }
    
    createImg.src = data[i].img
    pTwo.textContent = data[i].desc
    span.textContent = 'x'
    span.setAttribute('id', data[i].id)

    div.appendChild(h2)
    div.appendChild(span)
    div.appendChild(pOne)
    div.appendChild(createImg)
    div.appendChild(pTwo)
    div.appendChild(forecastDiv)

    cardSection.appendChild(div)
    }
}