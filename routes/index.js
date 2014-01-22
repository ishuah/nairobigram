exports.index = function(req, res){
  res.render('index', { title: 'Nairobi on Instagram' });
};

exports.about_us = function(req, res){
	res.render('about_us', { title: 'About Nairobi on Instagram' })
}