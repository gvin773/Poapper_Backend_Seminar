const { setDefaultResultOrder } = require('dns');
const http = require('http');

const server = http.createServer((req, res) => {
    var arr = req.url.split('/');
    if(arr.length != 4)
    {
        res.write('Error!');
        res.end();
    }
    if(arr[1] == 'add' || arr[1] == 'sub' || arr[1] == 'mul' || arr[1] == 'div')
    {
        var num1 = Number(arr[2]);
        var num2 = Number(arr[3]);
        var num3;
        
        if(arr[1] == 'add') num3 = num1+num2;
        if(arr[1] == 'sub') num3 = num1-num2;
        if(arr[1] == 'mul') num3 = num1*num2;
        if(arr[1] == 'div') num3 = num1/num2;
        if(arr[1] == 'add') res.write(num1 + ' + ' + num2 + ' = ' + num3);
        if(arr[1] == 'sub') res.write(num1 + ' - ' + num2 + ' = ' + num3);
        if(arr[1] == 'mul') res.write(num1 + ' * ' + num2 + ' = ' + num3);
        if(arr[1] == 'div') res.write(num1 + ' / ' + num2 + ' = ' + num3);
        res.end();
    }
});

server.listen(8080);
server.on('listening', () => {
  console.log("server is running on 8080 port.");
})
