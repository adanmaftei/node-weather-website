const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = searchInput.value
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)

    fetch(url).then((response) => {
    response.json().then(({error, location, forecast}) => {
        if(error){
            messageOne.textContent = error
        } else {
            messageOne.textContent = location
            messageTwo.textContent = forecast.summary
        }        
    })
})
})