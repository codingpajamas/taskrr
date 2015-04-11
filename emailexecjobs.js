var nodemailer = require('nodemailer');
var kue = require('kue');
var jobs = kue.createQueue();

// basic nodemailer config, use your own settings
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth : {
		user: 'user@gmail.com',
		pass: 'password'
	}
});

// create a job called 'EMAIL' and limit the concurrent job running to 10
// if you want to limit the SMTP process at 300, update '10' to '300'
jobs.process('EMAIL', 2, function(job, done){  

	// show the ID of job being process in console
	console.log('processing job '+job.id);

	// this is whare the email function go.
	// if the function is successful, it should return a 'done()' 
	// and if false, it should return a 'done(new Error('error message'))' 
	// to notify kue that this job has failed  
	transporter.sendMail({
		from : 'from@gmail.com',
		to : job.data.to,
		subject : 'Hi from nodemailer and kue',
		text : 'Message goes here.'
	}, function(err, info){
		if(err){
			return done(new Error(err.message));
		}else{
			console.log(info.response);
			done();
		}
	});
});

// When a job failed, they're pushed into 'delayed' jobs if '.attempts()' was on and will stuck there.
// '.promote()' runs in daemon, it checks delayed jobs and put them in queue when the delays timeout.
jobs.promote(1000);