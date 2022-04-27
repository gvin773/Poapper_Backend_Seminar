const http = require('http');
require('date-utils');

const server = http.createServer((req, res) => {
    if(req.url == '/timer')
    {
        var newDate = new Date();
        var time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS');
        res.write(time);
        res.end();
    }
});

server.listen(8080);
server.on('listening', () => {
  console.log("server is running on 8080 port.");
})
