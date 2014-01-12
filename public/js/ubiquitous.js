var socket = io.connect();

socket.on('images', function(data){
  $('.spinner').remove();
  //$('section#feed').append(data.images);
  for(var i = data.images.length-1; i>-1; i--){
    UB.Image.create(data.images[i]);
  }
});

socket.on('updates', function(data){
  //$(data.images).hide().prependTo('section#feed').fadeIn("slow");
   for(var i = 0; i<data.images.length; i++){
    UB.Image.create(data.images[i]);
  }
});

socket.on('error', function(){
  $('.spinner').remove();
  socket.removeAllListeners('images');
  socket.removeAllListeners('updates');
  $('section#feed').append("<h1>There's a slight problem. Try loading the page from <a href='https://nairobigram.herokuapp.com'>here.</a></h1>");
});