var locationFormat= null;
$(document).ready(function(){
  var baseUrlGoogle = 'https://maps.googleapis.com/maps/api/geocode/json?address=';//make sure this address conrrect for 404 because some websites change their api url
  var baseUrlForecast='https://api.forecast.io/forecast/';

  $('#get-weather').on('click',processWeather);//click on get weather button

 function processWeather(){
   $('#output').html("");//clear input & info on index html;
   var location=$('#CityState').val();//pass input field to location var;
   getCoordinates(location);//function to get info from google;
 }
 function getCoordinates(data){
   var coordinatesData={
     url:buildUrlGoogle(data),
     dataType:'json',
     success: getForcast,
     error:errorHandler,
   };
   $.ajax(coordinatesData);
 }//date is the city name, build obj coordinatesData, get cityname,latitude,longtitude, and these info goes to success: get forcast

function getForcast(data){
  locationFormat=data.results[0].formatted_address;
  var latitude=data.results[0].geometry.location.lat;
  var longtitude=data.results[0].geometry.location.lng;
  var weatherData={
    url:buildUrlForecast(latitude,longtitude),
    dataType:'jsonp',
    success:showWeather,
    error:errorHandler,
  };
  $.ajax(weatherData);
}//data is info from google;data is obj,index:[0], location will store formatted_address;{}means'.'if[]means index
//pull info wanted;data.hourly.data[0].time is first timeperiod;
//weatherdata and coordinatedata are obj store pulled data;

function showWeather(data){
  var source=$('#summary').html();// what built in html with id of summary;
  var template=Handlebars.compile(source);
  var extractedData={
    currentTime:moment(data.currently.time*1000).format('MMMM Do YYYY, h:mm:ss a'),
    summary:data.currently.summary,
    temperature:data.currently.temperature,
    humidity:data.currently.humidity,
    windSpeed:data.currently.windSpeed,
    windDirection:data.currently.windBearing,
    icon:data.currently.icon,
    city:locationFormat,
  };//what info you want to pull and show; // data inside extractedData are in {{}} for html to locate them
  var html=template(extractedData);
  $('#output').append(html)//pass var html

}
  function buildUrlGoogle(data){
    return baseUrlGoogle+data;//data is location
  }

  function buildUrlForecast(lat,lng){
    return baseUrlForecast+apiKeyForecast+'/'+lat+","+lng;
  }
  function errorHandler(err){
    console.log(err);
  }
});
