# taskrr
Task Server in nodejs using kue

#### How to use

Make sure you have **redis** running. Install dependencies,

~~~
npm install
~~~

Kue comes with a fantastic UI. Open a terminal and ```cd``` to taskrr directory and run 

~~~
node viewjobs
~~~

Then browse to ```localhost:3000```. You can configure the port it 3000 is not available.

To create jobs and put them in queue (producer), open another terminal and run

~~~
node fakecreatejob
~~~

To process the jobs in queue (consumer), open another terminal and run 

~~~
node fakeexecjob
~~~

You can run several **consumer** in parallel by running ```node fakeexecjob``` in multiple terminal. They will never conflict in which job is to process.

Check your browser for the realtime activity of your task server.

#### Email task example
There are ```emailcreatejobs.js``` and ```emailexecjobs.js``` to demonstrate a basic email task using nodemailer.
