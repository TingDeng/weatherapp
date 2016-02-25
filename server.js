var express = require('express'),
    logger  = require('morgan')('dev'),
    server  = express();
server.use(express.static(__dirname+'/public'));
server.use(logger);
server.set('port', process.env.PORT || 8080);
server.get('/', home);
server.get('/output', weather);
server.listen(server.get('port'), listenCallback);
function home(req, res){
  res.sendFile('/html/index.html', {root: __dirname+'/public'});
}
function weather(req, res){
  res.sendFile('/html/output.html', {root: __dirname+'/public'});
}
function listenCallback(){
  console.log('Now listening on port ' + server.get('port'));
}
