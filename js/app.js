//(function dBikes(){
	var stations;
	var bigFuzz;
	//INIT
	var init = function(){
		console.log("initialized");
		getStation(67);
		console.log(requestUrl);
		getStations();
	};

	var stationInfo = [];
	//SETTINGS
	var apiKey 		= 'd2ddadbd88d9148e853c6e946505b6b97e376777',
		contract 	= 'Dublin',
		station 	= '',
		requestUrl 	= 'https://api.jcdecaux.com/vls/v1/stations/'+station+'?contract='+contract+'&apiKey='+apiKey+'';

	// Set Global Page Transition Effect
	// Currently set to : slide
	$.mobile.defaultPageTransition = 'slide';

	//ON AJAX START
	$(document).ajaxStart(function() {
	 console.log("LOADING DATA");
	 $('.loading').fadeIn();
	});

	//ON AJAX COMPLETE
	$(document).ajaxComplete(function( event,request, settings ) {
	  console.log("COMPLETED LOADING DATA");
	  resetStation();
	  if(stations){
	  	stations = stations;
	  }
	  $('.loading').fadeOut();
	  console.log(event);
	});

	//ON AJAX ERROR
	$(document).ajaxError( function(event, jqXHR, ajaxSettings, thrownError){
		if(jqXHR.status === 404){
			console.log("ERROR : " + jqXHR.status + " , STATION DOES NOT EXIST?");
			resetStation();
		}
	});

	//REST GET REQUESTS
	function getStation(id){
		if(!id){
			id=station;
			console.log("NO ID - RETURNING ALL");
		}
		station = id.toString();

		console.log(station);
		getData();

	}
	//GET AJAX REQUEST 
	function getData(){
		requestUrl 	= 'https://api.jcdecaux.com/vls/v1/stations/'+station+'?contract='+contract+'&apiKey='+apiKey+'';
		$.get(requestUrl , function(data){
			//Data fun time
			console.log(data);
			var thisStation = {
				name : data.name,
				totalStands : data.bike_stands,
				freeStands  : data.available_bike_stands,
				freeBikes   : data.available_bikes
			};
			stationInfo.push(thisStation);
			displayData(stationInfo.length -1);
		});
	}

	// RESET STATION
	function resetStation(){
		station = '';
	}
	// Array - Number,Name,Address,Latitude,Longtitude
	var stations;
	//PRINT TO DOM
	function displayData(i){
		$('#data').append('Name : ' + stationInfo[i].name + '<br>');
		$('#data').append('Total Stands : ' + stationInfo[i].totalStands + '<br>');
		$('#data').append('Free Stands : ' + stationInfo[i].freeStands + '<br>');
		$('#data').append('Free Bikes : ' + stationInfo[i].freeBikes );
	}
	function getStations(){
		requestUrl = 'dublin.json';
		$.get(requestUrl, function(data){
		 	stations = data;
		});
	}
	var options = {
	  keys: ['address'],   // keys to search in
	}
	function fuzzySearch(search){
		var f = new Fuse(stations, options);
		var fuzz = f.search(search);
		domPrint(fuzz);
	}

	$('#search').bind('input', function() { 
		fuzzySearch($(this).val());
	});


	function domPrint(results){
		$('.result').html('<li id="first" data-station="'+ results[0].number +'">'+ results[0].name + '</li>' + '<li data-station="'+ results[1].number +'">' + results[1].name +'</li>');
		enableClick();
	}

	function enableClick(){
		$('li').click(function(){
			var stationId = this.getAttribute('data-station')
			getStation(stationId);
		});
	}

	//RUN
	init();
//})();