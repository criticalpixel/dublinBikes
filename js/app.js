(function dBikes(){
	var init = function(){
		console.log("initialized");
		getStation(25);
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
	});

	//ON AJAX COMPLETE
	$(document).ajaxComplete(function( event,request, settings ) {
	  console.log("COMPLETED LOADING DATA");
	  resetStation();
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
			displayData();
		});
	}

	// RESET STATION
	function resetStation(){
		station = '';
	}

	//PRINT TO DOM
	function displayData(){
		$('#data').append('Name : ' + stationInfo[0].name + '<br>');
		$('#data').append('Total Stands : ' + stationInfo[0].totalStands + '<br>');
		$('#data').append('Free Stands : ' + stationInfo[0].freeStands + '<br>');
		$('#data').append('Free Bikes : ' + stationInfo[0].freeBikes );
	}
	//RUN
	init();
})();