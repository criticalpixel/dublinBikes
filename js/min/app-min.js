!function a(){function a(a){a||(a=d,console.log("NO ID - RETURNING ALL")),d=a.toString(),console.log(d),t()}function t(){l="https://api.jcdecaux.com/vls/v1/stations/"+d+"?contract="+c+"&apiKey="+i,$.get(l,function(a){console.log(a);var t={name:a.name,totalStands:a.bike_stands,freeStands:a.available_bike_stands,freeBikes:a.available_bikes};s.push(t),e()})}function n(){d=""}function e(){$("#data").append("Name : "+s[0].name+"<br>"),$("#data").append("Total Stands : "+s[0].totalStands+"<br>"),$("#data").append("Free Stands : "+s[0].freeStands+"<br>"),$("#data").append("Free Bikes : "+s[0].freeBikes)}var o=function(){console.log("initialized"),a(25)},s=[],i="d2ddadbd88d9148e853c6e946505b6b97e376777",c="Dublin",d="",l="https://api.jcdecaux.com/vls/v1/stations/"+d+"?contract="+c+"&apiKey="+i;$.mobile.defaultPageTransition="slide",$(document).ajaxStart(function(){console.log("LOADING DATA")}),$(document).ajaxComplete(function(a,t,e){console.log("COMPLETED LOADING DATA"),n()}),$(document).ajaxError(function(a,t,e,o){404===t.status&&(console.log("ERROR : "+t.status+" , STATION DOES NOT EXIST?"),n())}),o()}();