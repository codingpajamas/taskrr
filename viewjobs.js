var kue = require('kue');
kue.app.listen(3000, function(){
	console.log('running at port 3000')
});