// store list of presentations which include what is the title and its current slide
// default to 2 presentations, demo & my presentation
// the list is loaded from config file under config/index.js
var presentations = {};

var demoPpt = function(req, res){
  res.render('demo', { title: 'Demo Presentation' })
};

var myPpt = function(req, res){
  res.render('myppt', { title: 'My Presentation' })
};


var controllerRoute = function(req, res){
  res.render('controller', { title: 'Remote Presentation Controller', layout: "controller_layout" })
};

exports.setupRemotePresenter = function(app, io, config){

	presentations = config.presentations; // load initial presentation list from config file

	// demo presentation
	app.get('/demo', demoPpt);
	
	// my presentation
	// url is matching the id for presentations
	app.get('/myppt', myPpt);
	
	
	app.get('/controller', controllerRoute);
	
	
	
	// setup remote control here
	// socket.io setup
	io.sockets.on('connection', function (socket) {
		
		// once connected need to broadcast the cur slide data
		 socket.on('request_presentation', function(data){
		 	if(presentations[data.id])
		 	{
		 		console.log('sending init presentation data ' + JSON.stringify(presentations[data.id]) );
		 		socket.emit('initdata', presentations[data.id]);
		 	}
		 });
		
		
		// send commands to make slide go previous/ next/etc
		// this should be triggered from the remote controller
		socket.on('command', function(command) {
			
			console.log("receive command " + JSON.stringify(command) );
			// TODO: future might need a way to tell how many slides there are
			var pptId = command.id;  // powerpoint id
			var cmd = command.txt;   // command can be 'up', 'down', 'left', 'right'
			if(presentations[pptId])
			{
				var curppt = presentations[pptId];
				// update ppt information
				if(cmd == 'up')
				{
					curppt.indexv--;
				}
				else if(cmd == 'down')
				{
					curppt.indexv++;
				}
				else if(cmd == 'left')
				{
					curppt.indexh--;
				}
				else if(cmd == 'right')
				{
					curppt.indexh++;
				}
				
				if(curppt.indexh < 0 )
					curppt.indexh = 0;
					
				if(curppt.indexv < 0 )
					curppt.indexv = 0;
				
				presentations[pptId] = curppt;
				
				// send the new data for update
				socket.broadcast.emit('updatedata', curppt);
			}
			
		});
		
	});	

	
};