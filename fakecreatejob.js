var kue = require('kue');
var jobs = kue.createQueue(); 

// This function creates a job called FAKE and passed in the 'name' data
function doFakeJob (name){
	var job = jobs.create('FAKE', {
					name : name
				});
	 
	job.on('complete', function(){
		console.log('Job ' + job.id + ' : Executing ' + job.data.name + ' is done')
	});

	job.on('failed', function(){
		console.log('Job ' + job.id + ' : ' + job.data.name + ' has failed')
	});

	job.attempts(3).backoff(function(attempts, delay){ 
		// on second attempt delay for 5secs, and for the next attemp delay it for 1minute
		var intDelay = attempts == 1 ? 5000 : 60000;
		return intDelay;
	}); 

	// for the fake jobs, we will delete any finished jobs
	job.removeOnComplete( true ).save();
}

// manually creates fake job
for (var i = 0; i < 300; i++) {
	doFakeJob('task'+i);
};