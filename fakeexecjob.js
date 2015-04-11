var kue = require('kue');
var jobs = kue.createQueue(); 

// create a job called 'EMAIL' and limit the concurrent job running to 10
// if you want to limit the SMTP process at 300, update '10' to '300'
jobs.process('FAKE', 10, function(job, done){  

	// show the ID of job being process in console
	console.log('processing job '+job.id);

	// this is whare the function that process the job go.
	// if the function is successful, it should return a 'done()' 
	// and if false, it should return a 'done(new Error('error message'))' 
	// to notify kue that this job has failed

	// Use settimeout to simulate a job that takes time to finish.
	// Then use math.random to simulate a change of failing job. 
	// If math.random is greater that .8, we will assume that the job will fail.
	// Hence, the job will fail at 20% and will succeed at 80% rate. 
	setTimeout(function(){
		if (.8 < Math.random()){ 
			return done(new Error('invalid to address'));
		} else {
			done();
		};
	}, 2000);  
});

// This run in daemon, it checks delayed jobs and put them in queue when the delays timeout.
jobs.promote(1000);