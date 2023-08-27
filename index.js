#!/usr/bin/env node
'use strict'
import express from 'express'

const app = express();

const config = {
    ip: '127.0.0.1',
    port: 8082
}
const handler = async (req,res) => {

    const rqq = req.query;
    if (!rqq.url) return res.status(404).end('Welcome to hero-images.weserv','utf8')

    // if url blank or not match regex url
    if (!rqq.url || !rqq.url.startsWith('http')) return res.status(404).end('Something Went Error','utf8')

    const outputFormat = `output=${rqq.jpg = 1 ? 'jpg&il' : 'webp&il'}`
    const imageQuality = `q=${rqq.l ?? 90}`
    const imgUrl = `url=${rqq.url}`

    console.log(`\n${outputFormat}&${imageQuality}&${imgUrl}\n`);

    const imgRes = await fetch(`https://images.weserv.nl/?${outputFormat}&${imageQuality}&${imgUrl}`);

    const responseContentType = imgRes.headers.get('Content-Type');

    
    res.setHeader('Content-Type',responseContentType)
    return res.end(new Uint8Array(await imgRes.arrayBuffer()));
}

app.get('/', handler)
app.get('/r', handler)

app.listen(process.env.PORT ?? config.port,()=> console.log(`\nthis is hero to images.weserv.nl,\nlistening on ${config.ip+':'+config.port}\n`))
