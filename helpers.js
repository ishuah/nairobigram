//helper functions
var settings = require('./settings.js');
var https = require('https');
var extend = require('util')._extend;

var geos_min_id = '';
var tags_min_tag_id = '';

var options_geos = {
  host: 'api.instagram.com',
  path: '/v1/geographies/4575837/media/recent?client_id='+settings.CLIENT_ID
};

var options_tags = {
  host: 'api.instagram.com',
  path: '/v1/tags/nairobi/media/recent?client_id='+settings.CLIENT_ID
};



//This function handles updates
exports.handleUpdates = function(socket, update){
		for(var i = 0; i < update.length; i++){
			fetchData(socket, update[i].object, true);
		}
	}

//This function loads all recent images
exports.loadImages = function(socket){
	fetchData(socket, 'geography', false);
	fetchData(socket, 'tag', false);
}

fetchData = function(socket, object_type, isupdate){
	if(isupdate)
			console.log("sidaaa");

	if(object_type == 'geography'){
		var myoption = extend({}, options_geos);
		if(isupdate){
			myoption.path += '&min_id='+geos_min_id;
			console.log('geography update:'+myoption.path);
		}

	}
	
	if (object_type == 'tag'){
		var myoption = extend({}, options_tags);
		if(isupdate){
			myoption.path += '&min_id='+tags_min_tag_id;
			console.log('tag update:'+myoption.path);
		}

	}
	
	
	
	https.get(myoption, function(response){
	  var payload = ''
	  response.on('data', function (chunk) {
	    payload += chunk;
	  });

	  response.on('end', function () {
	  	//images = '';
	  	images = Array();

	  	console.log(payload);
	  	payload = JSON.parse(payload);

	  	if(payload.pagination.next_min_id){
	  		if(object_type == 'geography'){
				geos_min_id = payload.pagination.next_min_id;
	  		}

			if (object_type == 'tag'){
				tags_min_tag_id = payload.pagination.next_min_id;
			}
	  	}
	  	

	  	for(var i = 0; i<payload.data.length; i++){
	  		image = Object();
	  		image.link = payload.data[i].link;
	  		image.src = payload.data[i].images.low_resolution.url;
	  		images.push(image);
	  		//images += '<a href="'+payload.data[i].link+'" target="_blank"><img src="'+payload.data[i].images.low_resolution.url+'" > </a>';
	  	}
	  	if(isupdate){
	  		if(images!='')
	  			socket.emit('updates', { images: images });
	  	}else{
	  		socket.emit('images', { images: images });
	  	}
	    
	  });
	});
}