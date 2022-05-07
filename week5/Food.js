const http = require('http');
const mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'poapper_backend'
});

const server = http.createServer((req, res) => {
    const url_parsed = req.url.split('/');
    const method = req.method;

    if(url_parsed[1] == 'food')
    {
        if(method == 'GET')
        {
            if(url_parsed[2] == '') //read all
            {
                db.query(`SELECT * FROM foods`, (err, results) => {
                    if(err) throw err;
                    res.write(JSON.stringify(results));
                });
            }
            else if(!isNaN(url_parsed[2]))
            {
                db.query(`SELECT * FROM foods WHERE id = ${url_parsed[2]}`, (err, results) => {
                    if(err) throw err;
                    res.write(JSON.stringify(results));
                });
            }
            else if(url_parsed[2] == 'isVegan')
            {
                db.query(`SELECT * FROM foods WHERE isVegan = 1`, (err, results) => {
                    if(err) throw err;
                    res.write(JSON.stringify(results));
                });
            }
        }
        else if(method == 'DELETE')
        {
            db.query(`DELETE FROM foods WHERE id = ${url_parsed[2]}`, (err, results) => {
                if(err) throw err;
            });
        }

        req.on('data', data => {
            const body = JSON.parse(data);
            if(method == 'POST')
            {
                db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}', '${body.isVegan}')`, (err, results) => {
                    if(err) throw err;
                });
            }
            else if(method == 'PUT' && !isNaN(url_parsed[2]))
            {
                db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${url_parsed[2]}`, (err, results) => {
                    if(err) throw err;
                });
            }
        });

        res.end();
    }
});

server.listen(8080);
server.on('listening', () => {
    console.log("server is running on 8080 port.");
});
