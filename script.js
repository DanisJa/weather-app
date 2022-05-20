const API_KEY = '3c04fa5d161caab6e5f2592b478adab1'
const searchBar = document.getElementById('search-bar')
let containersCreated = 0

function getFlag(code){
     return`https://countryflagsapi.com/svg/${code}`
}

function getIcon(code){
     return `http://openweathermap.org/img/wn/${code}@2x.png`
}

async function getData(cityName){
     console.log('getData() started')
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&lang=en`).then((res) => {
          return res.json()
     }).then( (res)=>{
          const flag =  getFlag(res.sys.country)
          const icon = getIcon(res.weather[0].icon)
          createCard(res.name, (res.main.temp - 273.15).toFixed(2), res.weather[0].main, flag, icon)
     })
}


const createCard = (city, temp, weather, flag, icon) => {
     if(containersCreated > 8){
          alert('Max numbers of containers reached!')
     }
     else{
          containersCreated++
          const card = document.createElement('div')
          card.className = 'card'

          const cityPara = document.createElement('h2')
          cityPara.textContent = "City: " + city

          const tempPara = document.createElement('h2')
          tempPara.textContent = "Temperature: " + temp + "°C"

          const weatherPara = document.createElement('h2')
          weatherPara.textContent = "Weather: " + weather

          const flagImg = document.createElement('img')
          flagImg.className = 'flag'
          flagImg.src = flag

          const favicon = document.createElement('img')
          favicon.className = 'icon'
          favicon.src = icon

          card.append(cityPara)
          card.append(tempPara)
          card.append(weatherPara)
          
          const iconHolder = document.createElement('div')
          iconHolder.className = "icon-holder"
          iconHolder.append(favicon)
          iconHolder.append(flagImg)

          card.append(iconHolder)

          document.querySelector('.container').appendChild(card)
     }
}

document.querySelector('#btn').addEventListener('click', ()=>{
          getData(searchBar.value)
})

