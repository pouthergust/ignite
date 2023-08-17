import http from 'node:http';
import json from './middlewares/json.js';

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req;

    await json(req, res)

    if(method === 'GET' && url === '/user') {
        return res
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/user') {
        const { name, email } = req.body
        users.push({
            id: 1,
            name,
            email
        })

        return res
            .writeHead(201)
            .end()
    }
    

    // return res.end('Hello World!', 
    //     () => console.log('Server running at http://localhost:3333/')
    // );
    return res.writeHead(404).end('Not Found')
});

server.listen(3333);