!function t(){function t(t){return t?(b=t.toString(),console.log(b),void e()):(t=b,void console.log("NO ID - RETURNING ALL"))}function e(){g="https://api.jcdecaux.com/vls/v1/stations/"+b+"?contract="+f+"&apiKey="+m,$.get(g,function(t){console.log(t);var e={name:t.name,totalStands:t.bike_stands,freeStands:t.available_bike_stands,freeBikes:t.available_bikes};r.push(e),a(r.length-1)})}function n(){b=""}function a(t){$("#data").html("Name : "+r[t].name+"<br> Total Stands : "+r[t].totalStands+"<br>Free Stands : "+r[t].freeStands+"<br>Free Bikes : "+r[t].freeBikes)}function o(){g="dublin.json",$.get(g,function(t){d=t})}function s(t){var e=new Fuse(d,v),n=e.search(t);void 0===n[0]?(console.log("no result"),$(".moreResults").fadeOut()):(i(n),$(".moreResults").fadeIn())}function i(t){var e=['<li data-station="'+t[0].number+'">'+t[0].name+"</li>",'<li data-station="'+t[1].number+'">'+t[1].name+"</li>",'<li class="extendedResult" data-station="'+t[2].number+'">'+t[2].name+"</li>",'<li class="extendedResult" data-station="'+t[3].number+'">'+t[3].name+"</li>",'<li class="extendedResult" data-station="'+t[4].number+'">'+t[4].name+"</li>",'<li class="extendedResult" data-station="'+t[5].number+'">'+t[5].name+"</li>"];$(".searchResults").html(e[0]+e[1]+e[2]+e[3]+e[4]+e[5]),l()}function l(){$("li").click(function(){var e=this.getAttribute("data-station");t(e)})}var d,c,u=function(){console.log("initialized"),t(),console.log(g),o()},r=[],m="d2ddadbd88d9148e853c6e946505b6b97e376777",f="Dublin",b="",g="https://api.jcdecaux.com/vls/v1/stations/"+b+"?contract="+f+"&apiKey="+m;$.mobile.defaultPageTransition="slide",$(document).ajaxStart(function(){console.log("LOADING DATA"),$(".loading").fadeIn()}),$(document).ajaxComplete(function(t,e,a){console.log("COMPLETED LOADING DATA"),n(),d&&(d=d),$(".loading").fadeOut()}),$(document).ajaxError(function(t,e,a,o){404===e.status&&(console.log("ERROR : "+e.status+" , STATION DOES NOT EXIST?"),n())});var v={keys:["address"]};$("#search").bind("input",function(){s($(this).val())}),$(".moreResults").click(function(){$(".extendedResult").toggle()}),u()}();