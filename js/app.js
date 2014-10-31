(function dBikes(){
	var stations,
		bigFuz;

	//INIT
	var init = function(){
		console.log("initialized");
		getStation();
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
			id = station;
			console.log("NO ID - RETURNING ALL");
			return;
		}
		station = id.toString();

		console.log(station);
		getData();

	}
	//GET AJAX REQUEST 
	function getData(){
		requestUrl 	= 'https://api.jcdecaux.com/vls/v1/stations/'+station+'?contract='+contract+'&apiKey='+apiKey;
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
	//PRINT TO DOM
	function displayData(i){
		$('#data').html('Name : ' + stationInfo[i].name + '<br> Total Stands : ' + stationInfo[i].totalStands + '<br>Free Stands : ' + stationInfo[i].freeStands + '<br>Free Bikes : ' + stationInfo[i].freeBikes );
		// $('#data').append('Total Stands : ' + stationInfo[i].totalStands + '<br>');
		// $('#data').append('Free Stands : ' + stationInfo[i].freeStands + '<br>');
		// $('#data').append('Free Bikes : ' + stationInfo[i].freeBikes );
	}
	function getStations(){
		requestUrl = 'dublin.json';
		$.get(requestUrl, function(data){
		 	stations = data;
		});
	}
	var options = {
	  keys: ['address'],   // keys to search in
	};
	function fuzzySearch(search){
		var f = new Fuse(stations, options);
		var fuzz = f.search(search);
		if(fuzz[0] === undefined){
			console.log("no result");
			$('.moreResults').fadeOut();
		}
		else{
			searchResults(fuzz);
			$('.moreResults').fadeIn();
		}	
	}

	$('#search').bind('input', function() { 
		fuzzySearch($(this).val());
	});


	function searchResults(results){
		var result = [  '<li data-station="'+ results[0].number +'">'+ results[0].name + '</li>',
						'<li data-station="'+ results[1].number +'">'+ results[1].name + '</li>',
						'<li class="extendedResult" data-station="'+ results[2].number +'">'+ results[2].name + '</li>',
						'<li class="extendedResult" data-station="'+ results[3].number +'">'+ results[3].name + '</li>',
						'<li class="extendedResult" data-station="'+ results[4].number +'">'+ results[4].name + '</li>',
						'<li class="extendedResult" data-station="'+ results[5].number +'">'+ results[5].name + '</li>',
		];	
		$('.searchResults').html(result[0]+result[1]+result[2]+result[3]+result[4]+result[5]);
		enableClick();
	}

	function enableClick(){
		$('li').click(function(){
			var stationId = this.getAttribute('data-station');
			getStation(stationId);
		});
	}

	$('.moreResults').click(function(){
		$('.extendedResult').toggle();
	});

	//RUN
	init();
})();