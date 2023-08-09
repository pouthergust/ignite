import http from 'node:http';

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if(method === 'GET' && url === '/user') {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/user') {
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
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