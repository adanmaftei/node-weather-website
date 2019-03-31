const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    const location = searchInput.value
    const url = '/weather?address=' + encodeURIComponent(location)

    fetch(url).then((response) => {
    response.json().then(({error, location, forecast}) => {
        if(error){
            messageOne.textContent = error
        } else {             
            messageOne.textContent = location
            messageTwo.textContent = forecast.summary
            messageThree.textContent = 'Temperatura curentă este de ' + forecast.temperature +' grade Celsius.'
        }        
    })
})
})