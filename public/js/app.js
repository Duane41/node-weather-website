const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

// message_1.textContent = 'From JS'

weather_form.addEventListener('submit', (e) => {
    e.preventDefault()

    message_1.textContent = "Loading..."

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message_1.textContent = "Error: " + data.error
        } else { 
            message_1.textContent = data.location
            message_2.textContent = "It is currently " + data.forecast.current_temp + " degrees outside. It feels like " + data.forecast.feels_like_temp +  " degrees outside."
        }
    })
})
})