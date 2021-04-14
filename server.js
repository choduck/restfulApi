

var app = require('./wsmwApp').createApp();

app.onReady();



function exitHandler(options, err) 
{
	var date = new Date();
	console.log( '---->> process exit handler : ' + date.toUTCString() );

	//if (options.cleanup) console.log('clean');
	if (options.from) console.log('from : ' + options.from);

    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, {from:'now exit'}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true, from:'sigint(ctrl+c)'}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true, from:'killed sigusr1'}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true, from:'killed sigusr2'}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:false, from:'uncaughtException'}));
