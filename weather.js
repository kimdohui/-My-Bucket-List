const API_KEY = "a6d7957d298610766303301872da5716";
const Coords = 'coords';
const weather = document.querySelector(".js-weather");

function getweather(lat, lng)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){ 
        //console.log(response.json());
        //then은 일이 끝난뒤 실행됨 json은 날씨 정보가 담긴 오브젝트이며 그것을 
        //response(여기 response는 network정보만 보이기 때문에) 에서 가져옴
    
        return response.json()
    }).then(function(json){
        const temp = json.main.temp;
        const place = json.name;
       
        weather.innerText = `(  ${place}   /   ${temp}ºc  )`;
    });
}

function savecoords(coordsobj)
{
    localStorage.setItem(Coords, JSON.stringify(coordsobj));
}

function handlegeosucces(position)
{
    console.log(position);
    //위도
    const latitude = position.coords.latitude;
    //경도
    const longitude = position.coords.longitude;
    
    const coordsobj = {
        latitude : latitude,
        longitude : longitude
        /*그냥 이름과 항목이 같을땐 
          latitude,
          longitude
          라고만 써도 됨
        */ 
    };
    savecoords(coordsobj);
    getweather(latitude, longitude);
}

function handlegeoerror(position)
{
    console.log('can not load');
}

function askforcoords() {
    navigator.geolocation.getCurrentPosition(handlegeosucces, handlegeoerror)
}

//navigator.geolocation.getCurrentPosition(나의 지금 좌표 가져오기 성공 함수 , 실패함수)
function loadcoords(){
    const loadedcoords = localStorage.getItem(Coords);

    if(loadedcoords === null)
    {
        askforcoords();
    }
    else{
       const parsecoords = JSON.parse(loadedcoords);
       getweather(parsecoords.latitude, parsecoords.longitude);
    }

    //parse 메소드는 string 객체를 json 객체로 변환
}

function init(){
loadcoords();
}

init();