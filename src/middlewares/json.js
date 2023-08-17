async function json(req, res) {
    const buffers = []

    for await (const chunk of req) {
        console.log("chunk", chunk);
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch { 
        req.body = null
    }

    return res.setHeader('Content-type', 'application/json')
}

export default json