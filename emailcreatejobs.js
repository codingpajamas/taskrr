var kue = require('kue');
var jobs = kue.createQueue(); 

function sendMail (to){
	var job = jobs.create('EMAIL', {
					to : to
				});
	 
	job.on('complete', function(){
		console.log('Job ' + job.id + ' : Sending email to ' + job.data.to + ' is done')
	});

	job.on('failed', function(){
		console.log('Job ' + job.id + ' : ' + job.data.to + ' has failed')
	});

	job.attempts(3).backoff(function(attempts, delay){ 
		var intDelay = attempts == 1 ? 5000 : 60000;
		return intDelay;
	}); 

	job.removeOnComplete( false ).save();
}

// manually send email job
for (var i = 0; i < 5; i++) {
	sendMail('receiver'+i+'@gmail.com');
};