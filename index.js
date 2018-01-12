var o = {
  "lat": 0,
  "lon": 0,
  "tC": 0,
  "tF": 0, 
  "location": ''
}  
  
var showCelsium = true;
    
$(document).ready(function() {      
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {      
    o.lon = position.coords.longitude;
    o.lat = position.coords.latitude;
    
    var myUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
                  o.lat + '&lon=' + 
                  o.lon + '&units=metric&appid=b231606340553d9174136f7f083904b3';
    $.ajax({
        url : myUrl,
        method : 'GET',
        errrep: true,
        error: function(type) {
          var errArr = ['Your browser does not support Ajax.',
                        'Request failed.',
                        'Address does not exist.',
                        'Timeout.'];
          $('#message').html('<h4>Ajax error: ' + errArr[type] + '</h4>');
        },
        success : function (data) {        
          var tempr = data.main.temp;                      
          var imgSrc = data.weather[0].icon;
          o.tC = Math.round(tempr);
          o.tF = Math.round((tempr * 1.8) + 32);
          o.location = data.name;
          $('#pic').html("<img src=\"http://openweathermap.org/img/w/" + imgSrc + ".png\" width=\"80px\"></img><br>");
          $('#message').html('<h4>' + o.tC + '&#176;C ' + o.location);
        }                                                           
      });            
    });
  } 
  else 
    $('#message').html("<h4>Sorry, it is impossible to get your geolocation data.</h4>"); 

  $("#togBtn").on("click", function(){  
    if(showCelsium) 
      $('#message').html('<h4>' + o.tC + '&#176;F ' + o.location);
    else
      $('#message').html('<h4>' + o.tC + '&#176;C ' + o.location);  
    showCelsium = !showCelsium;              
  });
});