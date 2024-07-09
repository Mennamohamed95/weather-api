let myApiKey =`ea1159f7548c48e4931165930240107`;
let searchLocation =document.querySelector('.searchLocation')
let today = document.querySelector('.today')
let tomorrow = document.querySelector('.tomorrow')
let afterTomorrow = document.querySelector('.afterTomorrow')




if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(e){
        let lat = e.coords.latitude;
        let long = e.coords.longitude;
        getApi(`${lat},${long}`)

    })
}

async function getApi(query){

    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=ea1159f7548c48e4931165930240107`)
    let finallResponse = await response.json()
    displaydate(finallResponse)
    displayTomorrow(finallResponse)
    displayAfterTomorrow(finallResponse)
}




searchLocation.addEventListener('input' , function(e){

    getApi(e.target.value)

})

function displaydate(finallResponse){
    let allTodayDate = finallResponse.current.last_updated
    let date = new Date(allTodayDate)
    let todayWeakDay = date.toLocaleString('en-us',{weekday : 'long'})
   
    let todayDay = date.getDate()
    let todayMonth = date.toLocaleString('en-us',{month : 'long'})
    let cityName =finallResponse.location.name;

    let todayDegree =finallResponse.current.temp_c;

    let todayCondition =finallResponse.current.condition.text;

    let humidity =finallResponse.current.humidity;
    let windSpeed =finallResponse.current.wind_kph;
    let dir =finallResponse.current.wind_dir;
    let img =finallResponse.current.condition.icon;
    
    

  
    displayToday(todayDay ,todayWeakDay , todayMonth ,cityName,todayDegree , todayCondition , humidity ,windSpeed ,dir ,img )

}

function displayToday(todayDay,todayWeakDay , todayMonth ,cityName,todayDegree , todayCondition , humidity ,windSpeed ,dir ,img ){
    let box = ``
    box =`
                    <div class="card-top py-2 px-2 d-flex justify-content-between text-muted  ">
                        <h5 class="m-0 cityName">${todayWeakDay}</h5>
                        <h5 class="m-0 date">${todayDay} ${todayMonth}</h5>
                    </div>
                   <div class="p-3">
                    <h5 class="cityName">${cityName}</h5>
                    <div class="d-flex justify-content-between">
                     <h2 class="py-3 h1 fs-1">${todayDegree}<sup>o</sup>C</h2>
                     <img class="w-25" src="https:${img}" alt="">
                     </div>
                    <span  class="spans-color mb-3" >${todayCondition}</span>
                   </div>
                    <div class="d-flex justify-content-around py-4">
                        <span class="main-span"><img src="images/icon-umberella.png" alt=""> ${humidity}%</span>
                        <span class="main-span"><img src="images/icon-wind.png" alt=""> ${windSpeed}km/h</span>
                        <span class="main-span"><img src="images/icon-compass.png" alt=""> ${dir}</span>

                    </div>

                `

                today.innerHTML=box
}

function displayTomorrow({forecast}){
    console.log(forecast)
    let weekday =new Date (forecast.forecastday[1].date).toLocaleString('en-us',{weekday : 'long'});
    let img = forecast.forecastday[1].day.condition.icon;
    let tMax = forecast.forecastday[1].day.maxtemp_c;
    let tMin = forecast.forecastday[1].day.mintemp_c;
    let condition =forecast.forecastday[1].day.condition.text;
    let box =``
    box=
    ` <div class="card-top2 py-2 px-2 d-flex justify-content-center text-muted mb-3  ">
                        <h5 class="m-0">${weekday}</h5>
                    </div>
                    <img src="https:${img}" alt="">
                    <h2>${tMax} <sup>o</sup>c</h2>
                    <h6>${tMin} <sup>o</sup>c</h6>
                    <span class="spans-color">${condition}</span>`


                    tomorrow.innerHTML=box
}


function displayAfterTomorrow({forecast}){
    console.log(forecast)
    let weekday =new Date (forecast.forecastday[2].date).toLocaleString('en-us',{weekday : 'long'});
    let img = forecast.forecastday[2].day.condition.icon;
    let tMax = forecast.forecastday[2].day.maxtemp_c;
    let tMin = forecast.forecastday[2].day.mintemp_c;
    let condition =forecast.forecastday[2].day.condition.text;
    let box =``
    box=
    `  <div class="card-top py-2 px-2 d-flex justify-content-center text-muted mb-3  ">
                        <h5 class="m-0">${weekday}</h5>
                    </div>
                    <img src="https:${img}" alt="">
                    <h2>${tMax} <sup>o</sup>c</h2>
                    <h6>${tMin}<sup>o</sup>c</h6>
                    <span class="spans-color">${condition}</span>`


                    afterTomorrow.innerHTML=box
}
