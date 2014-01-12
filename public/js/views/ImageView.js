UB.ImageView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},

	render: function(){
		this.setElement(UB.ImageViewTemplate(this.model.toJSON()));
		this.$el.hide().prependTo('section#feed').fadeIn("slow");
		return this;
	}
});