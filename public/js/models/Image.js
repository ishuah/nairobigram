UB.Image = Backbone.Model.extend({

}, {
	create: function(data, isupdate){
		var image = new UB.Image(data);
		var imageview = new UB.ImageView({ model: image });
		UB.images.add(image);
	}
});

UB.Images = Backbone.Collection.extend({
	model: UB.Image,
});

UB.images = new UB.Images();